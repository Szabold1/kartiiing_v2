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
    if (search) {
      console.log('Search term:', search);
      this.addSearchFilter(qb, search);
    }

    const totalItems = await qb.getCount();
    qb.skip(skip).take(pageSize);
    const events = await qb.getMany();

    if (events.length === 0) {
      throw new NotFoundException(
        year ? `No race events found for year ${year}` : `No race events found`,
      );
    }

    const data = this.transformEvents(events, includeStatus);
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
      .leftJoinAndSelect('raceEvent.championships', 'championships')
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
   * Add search filters to the query builder
   */
  private addSearchFilter(
    qb: SelectQueryBuilder<RaceEvent>,
    search: string,
  ): void {
    const searchTerms = search
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((term) => term.length > 0);

    if (searchTerms.length === 0) return;

    const seasonToMonths: Record<string, number[]> = {
      spring: [3, 4, 5],
      summer: [6, 7, 8],
      autumn: [9, 10, 11],
      fall: [9, 10, 11],
      winter: [12, 1, 2],
    };

    const conditions: string[] = [];
    const parameters: Record<string, string | number[]> = {};

    searchTerms.forEach((term, index) => {
      if (seasonToMonths[term]) {
        const months = seasonToMonths[term];
        const monthParam = `months${index}`;
        conditions.push(
          `EXTRACT(MONTH FROM raceEvent.dateStart) IN (:...${monthParam})`,
        );
        parameters[monthParam] = months;
      } else {
        const paramName = `search${index}`;
        conditions.push(`(
          circuit.nameShort ILIKE :${paramName} OR 
          circuit.nameLong ILIKE :${paramName} OR
          country.name ILIKE :${paramName} OR
          championships.nameShort ILIKE :${paramName} OR
          championships.nameLong ILIKE :${paramName} OR
          championships.nameSeries ILIKE :${paramName} OR
          categories.name ILIKE :${paramName} OR
          categories.engineType ILIKE :${paramName} OR
          EXTRACT(YEAR FROM raceEvent.dateStart)::text ILIKE :${paramName}
        )`);
        parameters[paramName] = `%${term}%`;
      }
    });

    qb.andWhere(conditions.join(' AND '));
    qb.setParameters(parameters);
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
