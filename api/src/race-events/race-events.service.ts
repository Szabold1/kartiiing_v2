import { Injectable, NotFoundException } from '@nestjs/common';
import {
  RaceEventSortOptions,
  IRaceEvent,
  IRaceEventDetail,
  IPaginatedResponse,
  ISeoData,
  IRaceEventMinimal,
  IWeatherDataDay,
  IRaceEventDateMinimal,
  RaceStatus,
} from '@kartiiing/shared';
import {
  toIRaceEvent,
  toIRaceEventDetail,
  toIRaceEventMinimal,
} from './race-event.resource';
import { FindRaceEventsQuery } from './dtos';
import { RaceEvent } from '../entities/raceEvent.entity';
import { RaceStatusCalculator } from './race-status.calculator';
import { SEASON_TO_MONTHS, MONTH_NAMES } from './season-month.constants';
import { WeatherService } from '../weather/weather.service';
import { RaceEventPersistence } from './race-events.persistence';

@Injectable()
export class RaceEventsService {
  constructor(
    private raceEventPersistence: RaceEventPersistence,
    private weatherService: WeatherService,
  ) {}

  /**
   * Finds all race events.
   */
  async findAll(
    query: FindRaceEventsQuery,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    return this.findPaginated(query);
  }

  /**
   * Finds race events for a specific year.
   */
  async findByYear(
    year: number,
    query: FindRaceEventsQuery,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    return this.findPaginated(query, year);
  }

  /**
   * Gets a list of all years for which race events are available.
   */
  async getAvailableYears(): Promise<number[]> {
    return this.raceEventPersistence.findAvailableYears();
  }

  /**
   * Find a race event by its ID and return detailed information
   */
  async findById(id: number): Promise<IRaceEventDetail> {
    const event = await this.raceEventPersistence.findEventById(id);

    if (!event) {
      console.error(`Race event not found with id: ${id}`);
      throw new NotFoundException(`Race event with id ${id} not found`);
    }

    const weatherData = await this.getRaceEventWeather(event);
    const status = await this.getRaceEventStatus({
      start: event.dateStart,
      end: event.dateEnd,
    });

    return toIRaceEventDetail(event, status, weatherData);
  }

  /**
   * Generate SEO metadata for the calendar page, optionally filtered by year
   */
  async getCalendarMetadata(year?: number): Promise<ISeoData> {
    const stats = await this.raceEventPersistence.findYearStats(year);

    return {
      title: `Racing Calendar ${year ? `${year} ` : ``}- Kartiiing`,
      description: `Discover our ${year ? `${year} ` : ``}karting calendar, featuring ${stats.races} races across ${stats.circuits} circuits, representing ${stats.championships} championships.`,
      keywords: `${year ? `${year} ` : ``}karting calendar, kart racing calendar, karting events, race schedule, karting championship calendar`,
    };
  }

  /**
   * Get a minimal list of all race events without pagination, sorted by most recent first.
   * This is used for sitemap generation and other internal uses where we need the full list of events without pagination.
   */
  async getMinimal(): Promise<IRaceEventMinimal[]> {
    const allEvents = await this.raceEventPersistence.findMinimalEvents();
    return allEvents.map((event) => toIRaceEventMinimal(event));
  }

  // ------------------------------------------------------------- //
  // ----- Private Helper Methods -------------------------------- //

  /**
   * Shared core method for paginated race event queries, with optional year filter
   */
  private async findPaginated(
    query: FindRaceEventsQuery,
    year?: number,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    const {
      sort = RaceEventSortOptions.ASC,
      page = 1,
      limit = 20,
      search,
      includeStatus = true,
    } = query;

    const pageNumber = +page;
    const pageSize = +limit;
    const skip = (pageNumber - 1) * pageSize;

    const allEvents = await this.raceEventPersistence.findAllEventsWithSorting(
      sort,
      year,
    );

    // Apply search filtering at the application level
    let filteredEvents = allEvents;
    if (search) {
      filteredEvents = this.filterEventsBySearch(allEvents, search);
    }

    const totalItems = filteredEvents.length;
    const paginatedEvents = filteredEvents.slice(skip, skip + pageSize);

    if (paginatedEvents.length === 0) {
      throw new NotFoundException(
        year ? `No race events found for year ${year}` : `No race events found`,
      );
    }

    const data = this.transformEvents(paginatedEvents, includeStatus);
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      meta: {
        currentPage: pageNumber,
        itemsPerPage: pageSize,
        totalItems,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    };
  }

  /**
   * Filter events by search terms at the application level
   */
  private filterEventsBySearch(
    events: RaceEvent[],
    search: string,
  ): RaceEvent[] {
    const normalizedSearchTerms = search
      .split(/\s+/)
      .map((term) => this.normalizeString(term));

    if (normalizedSearchTerms.length === 0) return events;

    // Separate season/month terms from other search terms
    const seasonMonthTerms = this.extractSeasonMonthTerms(
      normalizedSearchTerms,
    );
    const otherTerms = normalizedSearchTerms.filter(
      (term) => !seasonMonthTerms.includes(term),
    );

    return events.filter((event) => {
      if (!this.matchesSeasonOrMonth(event.dateStart || '', seasonMonthTerms)) {
        return false;
      }

      if (otherTerms.length === 0) return true;

      // ALL other search terms must match at least one field
      return otherTerms.every((term) => {
        const championshipMatch = event.championshipDetails?.some(
          (detail) =>
            this.normalizeString(detail.championship.nameShort || '').includes(
              term,
            ) ||
            this.normalizeString(detail.championship.nameLong || '').includes(
              term,
            ) ||
            this.normalizeString(detail.championship.nameSeries || '').includes(
              term,
            ),
        );

        const categoryMatch = event.categories?.some(
          (cat) =>
            this.normalizeString(cat.name || '').includes(term) ||
            this.normalizeString(cat.engineType || '').includes(term),
        );

        const circuitMatch =
          this.normalizeString(event.circuit?.locationName || '').includes(
            term,
          ) ||
          this.normalizeString(event.circuit?.name || '').includes(term) ||
          this.normalizeString(event.circuit?.country?.name || '').includes(
            term,
          );

        const yearMatch = new Date(event.dateStart || '')
          .getFullYear()
          .toString()
          .includes(term);

        return championshipMatch || categoryMatch || circuitMatch || yearMatch;
      });
    });
  }

  /**
   * Extract season and month terms from search terms
   * Full or partial matches are allowed
   */
  private extractSeasonMonthTerms(normalizedTerms: string[]): string[] {
    return normalizedTerms.filter((term) => {
      if (Object.keys(SEASON_TO_MONTHS).some((season) => season.includes(term)))
        return true;
      return Object.values(MONTH_NAMES).some((month) => month.includes(term));
    });
  }

  /**
   * Check if an event matches season/month terms, full or partial matches allowed
   */
  private matchesSeasonOrMonth(
    eventDate: string,
    seasonMonthTerms: string[],
  ): boolean {
    if (seasonMonthTerms.length === 0) return true;

    const eventMonth = new Date(eventDate || '').getMonth() + 1;
    const eventMonthName = MONTH_NAMES[eventMonth];

    return seasonMonthTerms.some((term) => {
      for (const [season, months] of Object.entries(SEASON_TO_MONTHS)) {
        if (season.includes(term) && months.includes(eventMonth)) {
          return true;
        }
      }
      return eventMonthName?.includes(term);
    });
  }

  /**
   * Normalize a string by removing diacritics and converting to lowercase
   */
  private normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Transform race events to IRaceEvent/IRaceEventDetail with optional status calculation
   */
  private transformEvents(
    events: RaceEvent[],
    includeStatus: boolean,
    returnDetail = false,
  ): IRaceEvent[] | IRaceEventDetail[] {
    const nextRaceDate = includeStatus
      ? RaceStatusCalculator.getNextRaceDate(
          events.map((e) => ({
            date: {
              start: e.dateStart || '',
              end: e.dateEnd || '',
            },
          })),
        )
      : null;

    // Get status for each event and transform to IRaceEvent or IRaceEventDetail
    const transformedEvents = events.map((event) => {
      const raceDate = {
        start: event.dateStart || '',
        end: event.dateEnd || '',
      };
      const status = includeStatus
        ? RaceStatusCalculator.getRaceStatus(raceDate, nextRaceDate)
        : null;

      return returnDetail
        ? toIRaceEventDetail(event, status)
        : toIRaceEvent(event, status);
    });

    return transformedEvents;
  }

  /**
   * Calculate the status of a race.
   * If it's in the past or live, calculate based on current date.
   * If it's in the future, calculate based on the next upcoming race.
   */
  private async getRaceEventStatus(
    raceDate: IRaceEventDateMinimal,
  ): Promise<RaceStatus | null> {
    if (new Date(raceDate.end) <= new Date()) {
      return RaceStatusCalculator.getRaceStatus(raceDate, null);
    }

    const futureRaces = await this.raceEventPersistence.findFutureRaces();

    const nextRaceDate = RaceStatusCalculator.getNextRaceDate(
      futureRaces.map((race) => ({
        date: {
          start: race.dateStart || '',
          end: race.dateEnd || '',
        },
      })),
    );

    return RaceStatusCalculator.getRaceStatus(raceDate, nextRaceDate);
  }

  /**
   * Fetch weather data for a race event based on its circuit and date.
   */
  private async getRaceEventWeather(
    event: RaceEvent,
  ): Promise<IWeatherDataDay[] | []> {
    let weatherData: IWeatherDataDay[] | [] = [];
    try {
      weatherData = await this.weatherService.getWeatherForCircuit(
        event.circuit.id,
        {
          start: event.dateStart,
          end: event.dateEnd,
        },
        {
          latitude: Number(event.circuit?.latitude),
          longitude: Number(event.circuit?.longitude),
        },
      );
    } catch (error) {
      console.warn(
        `Weather fetch failed for race event ${event.id}, serving event without weather:`,
        error,
      );
    }

    return weatherData;
  }
}
