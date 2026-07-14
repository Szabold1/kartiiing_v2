import { Injectable, NotFoundException } from '@nestjs/common';
import {
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
import { RaceStatusCalculator } from './helpers/race-status.calculator';
import { RaceEventSearchService } from './helpers/race-event-search.service';
import { WeatherService } from '../weather/weather.service';
import { RaceEventPersistence } from './race-events.persistence';

@Injectable()
export class RaceEventsService {
  constructor(
    private raceEventPersistence: RaceEventPersistence,
    private weatherService: WeatherService,
    private raceEventSearch: RaceEventSearchService,
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
      page = 1,
      limit = 20,
      search,
      preset,
      includeStatus = true,
    } = query;

    const pageNumber = +page;
    const pageSize = +limit;
    const skip = (pageNumber - 1) * pageSize;

    const allEvents = await this.raceEventPersistence.findAllEventsFiltered(
      year,
      preset,
    );

    // Apply search filtering at the application level
    let filteredEvents = allEvents;
    if (search) {
      filteredEvents = this.raceEventSearch.applySearch(allEvents, search);
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
