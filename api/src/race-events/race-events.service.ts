import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  RaceEventSortOptions,
  IRaceEvent,
  IPaginatedResponse,
} from '@kartiiing/shared-types';
import { toIRaceEvent } from './race-event.resource';
import { FindRaceEventsQuery } from './dtos';
import { RaceEvent } from '../entities/raceEvent.entity';
import { RaceStatusCalculator } from './race-status.calculator';
import { RaceStatus } from '@kartiiing/shared-types';
import { SEASON_TO_MONTHS, MONTH_NAMES } from './season-month.constants';

@Injectable()
export class RaceEventsService {
  constructor(
    @InjectRepository(RaceEvent)
    private raceEventRepo: Repository<RaceEvent>,
  ) {}

  async findAll(
    query: FindRaceEventsQuery,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    return this.findPaginated(query);
  }

  async findByYear(
    year: number,
    query: FindRaceEventsQuery,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    return this.findPaginated(query, year);
  }

  async getAvailableYears(): Promise<number[]> {
    const years = await this.raceEventRepo
      .createQueryBuilder('raceEvent')
      .select('DISTINCT EXTRACT(YEAR FROM raceEvent.dateEnd)', 'year')
      .orderBy('year', 'DESC')
      .getRawMany();

    return years.map((result: { year: string }) => parseInt(result.year, 10));
  }

  async getYearStats(
    year: number,
  ): Promise<{ races: number; circuits: number; championships: number }> {
    const races = await this.raceEventRepo
      .createQueryBuilder('re')
      .where('EXTRACT(YEAR FROM re.dateStart) = :year', { year })
      .getCount();

    const circuitsResult = await this.raceEventRepo
      .createQueryBuilder('re')
      .select('COUNT(DISTINCT re.circuitId)', 'circuitCount')
      .where('EXTRACT(YEAR FROM re.dateStart) = :year', { year })
      .getRawOne<{ circuitCount: string }>();
    const circuits = parseInt(circuitsResult?.circuitCount || '0', 10);

    const championshipsResult = await this.raceEventRepo
      .createQueryBuilder('re')
      .innerJoin('re.championshipDetails', 'champ')
      .select('COUNT(DISTINCT champ.championshipId)', 'champCount')
      .where('EXTRACT(YEAR FROM re.dateStart) = :year', { year })
      .getRawOne<{ champCount: string }>();
    const championships = parseInt(championshipsResult?.champCount || '0', 10);

    return { races, circuits, championships };
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

    const qb = this.createBaseQueryBuilder();
    this.addSorting(qb, sort);
    if (year) {
      qb.andWhere('EXTRACT(YEAR FROM raceEvent.dateStart) = :year', { year });
    }

    const allEvents = await qb.getMany();

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
   * Create the base query builder with all necessary joins for race events
   */
  private createBaseQueryBuilder(): SelectQueryBuilder<RaceEvent> {
    return this.raceEventRepo
      .createQueryBuilder('raceEvent')
      .leftJoinAndSelect('raceEvent.circuit', 'circuit')
      .leftJoinAndSelect('circuit.country', 'country')
      .leftJoinAndSelect('raceEvent.championshipDetails', 'championshipDetails')
      .leftJoinAndSelect('championshipDetails.championship', 'championship')
      .leftJoinAndSelect('raceEvent.categories', 'categories')
      .leftJoinAndSelect('raceEvent.results', 'results')
      .leftJoinAndSelect('results.category', 'resultCategory');
  }

  /**
   * Add sorting to the query builder
   */
  private addSorting(
    qb: SelectQueryBuilder<RaceEvent>,
    sort: RaceEventSortOptions,
  ): void {
    qb.orderBy(
      'raceEvent.dateStart',
      sort === RaceEventSortOptions.DESC ? 'DESC' : 'ASC',
    );
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
          this.normalizeString(event.circuit?.nameShort || '').includes(term) ||
          this.normalizeString(event.circuit?.nameLong || '').includes(term) ||
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
   * Transform race events to IRaceEvent with optional status calculation
   */
  private transformEvents(
    events: RaceEvent[],
    includeStatus: boolean,
  ): IRaceEvent[] {
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

    // Get status for each event and transform to IRaceEvent
    const transformedEvents = events.map((event) => {
      const raceDate = {
        start: event.dateStart || '',
        end: event.dateEnd || '',
      };
      const status = includeStatus
        ? RaceStatusCalculator.getRaceStatus(raceDate, nextRaceDate)
        : null;

      return toIRaceEvent(event, status);
    });

    // If any event is LIVE, do not allow any event to be UPNEXT
    const hasLive = transformedEvents.some(
      (item) => item.status === RaceStatus.LIVE,
    );
    for (const event of transformedEvents) {
      if (hasLive && event.status === RaceStatus.UPNEXT) {
        event.status = undefined;
      }
    }

    return transformedEvents;
  }
}
