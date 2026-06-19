import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { RaceEventSortOptions } from '@kartiiing/shared';
import { RaceEvent } from '../entities/raceEvent.entity';

@Injectable()
export class RaceEventPersistence {
  constructor(
    @InjectRepository(RaceEvent)
    private readonly raceEventRepo: Repository<RaceEvent>,
  ) {}

  /**
   * Gets a list of all years for which race events are available.
   */
  async findAvailableYears(): Promise<number[]> {
    const years = await this.raceEventRepo
      .createQueryBuilder('raceEvent')
      .select('DISTINCT EXTRACT(YEAR FROM raceEvent.dateEnd)', 'year')
      .orderBy('year', 'DESC')
      .getRawMany();

    return years.map((result: { year: string }) => parseInt(result.year, 10));
  }

  /**
   * Find a race event by its ID with full detail relations loaded.
   */
  async findEventById(id: number): Promise<RaceEvent | null> {
    return this.createDetailQueryBuilder()
      .where('raceEvent.id = :id', { id })
      .getOne();
  }

  /**
   * Get all future races (including live) with full detail relations loaded.
   */
  async findFutureRaces(): Promise<RaceEvent[]> {
    const now = new Date();
    return this.createDetailQueryBuilder()
      .where('raceEvent.dateEnd >= :now', { now })
      .orderBy('raceEvent.dateStart', 'ASC')
      .addOrderBy('raceEvent.dateEnd', 'ASC')
      .getMany();
  }

  /**
   * Find all race events with sorting and optional year filter.
   * Returns the full unfiltered, unpaginated list.
   */
  async findAllEventsWithSorting(
    sort: RaceEventSortOptions,
    year?: number,
  ): Promise<RaceEvent[]> {
    const qb = this.createListQueryBuilder();
    this.addSorting(qb, sort);
    if (year) {
      qb.andWhere('EXTRACT(YEAR FROM raceEvent.dateStart) = :year', { year });
    }
    return qb.getMany();
  }

  /**
   * Find all race events with minimal data for sitemap generation,
   * sorted by most recent first.
   */
  async findMinimalEvents(): Promise<RaceEvent[]> {
    return this.raceEventRepo
      .createQueryBuilder('raceEvent')
      .leftJoinAndSelect('raceEvent.circuit', 'circuit')
      .leftJoinAndSelect('raceEvent.championshipDetails', 'championshipDetails')
      .leftJoinAndSelect('championshipDetails.championship', 'championship')
      .orderBy('raceEvent.dateEnd', 'DESC')
      .addOrderBy('raceEvent.id', 'DESC')
      .getMany();
  }

  /**
   * Calculate year stats for race events, including total races, unique circuits,
   * and unique championships. If year is omitted, returns stats for all years combined.
   */
  async findYearStats(
    year?: number,
  ): Promise<{ races: number; circuits: number; championships: number }> {
    let raceQb = this.raceEventRepo.createQueryBuilder('re');
    if (year) {
      raceQb = raceQb.where('EXTRACT(YEAR FROM re.dateStart) = :year', {
        year,
      });
    }
    const races = await raceQb.getCount();

    let circuitsQb = this.raceEventRepo.createQueryBuilder('re');
    if (year) {
      circuitsQb = circuitsQb.where('EXTRACT(YEAR FROM re.dateStart) = :year', {
        year,
      });
    }
    const circuitsResult = await circuitsQb
      .select('COUNT(DISTINCT re.circuitId)', 'circuitCount')
      .getRawOne<{ circuitCount: string }>();
    const circuits = parseInt(circuitsResult?.circuitCount || '0', 10);

    let championshipsQb = this.raceEventRepo.createQueryBuilder('re');
    if (year) {
      championshipsQb = championshipsQb.where(
        'EXTRACT(YEAR FROM re.dateStart) = :year',
        { year },
      );
    }
    const championshipsResult = await championshipsQb
      .innerJoin('re.championshipDetails', 'champ')
      .select('COUNT(DISTINCT champ.championshipId)', 'champCount')
      .getRawOne<{ champCount: string }>();
    const championships = parseInt(championshipsResult?.champCount || '0', 10);

    return { races, circuits, championships };
  }

  // ------------------------------------------------------------- //
  // ----- Private Helper Methods -------------------------------- //

  /**
   * Create a lightweight query builder for listing/pagination.
   * Only loads essential data needed for list views.
   */
  private createListQueryBuilder(): SelectQueryBuilder<RaceEvent> {
    return this.raceEventRepo
      .createQueryBuilder('raceEvent')
      .leftJoinAndSelect('raceEvent.circuit', 'circuit')
      .leftJoinAndSelect('circuit.layouts', 'circuitLayouts')
      .leftJoinAndSelect('circuit.country', 'country')
      .leftJoinAndSelect('raceEvent.championshipDetails', 'championshipDetails')
      .leftJoinAndSelect('championshipDetails.championship', 'championship')
      .leftJoinAndSelect('raceEvent.categories', 'categories')
      .leftJoinAndSelect('raceEvent.results', 'results')
      .leftJoinAndSelect('results.category', 'resultCategory');
  }

  /**
   * Create a full query builder for detail views.
   * Loads all relations including results, fastest laps, and circuit fastest laps.
   */
  private createDetailQueryBuilder(): SelectQueryBuilder<RaceEvent> {
    return this.createListQueryBuilder()
      .leftJoinAndSelect('raceEvent.circuitLayout', 'circuitLayout')
      .leftJoinAndSelect('raceEvent.fastestLaps', 'fastestLaps')
      .leftJoinAndSelect('fastestLaps.category', 'fastestLapCategory')
      .leftJoinAndSelect('fastestLaps.driver', 'driver')
      .leftJoinAndSelect('driver.country', 'driverCountry')
      .leftJoinAndSelect('circuit.fastestLaps', 'circuitFastestLaps')
      .leftJoinAndSelect(
        'circuitFastestLaps.category',
        'circuitFastestLapCategory',
      )
      .leftJoinAndSelect('circuitFastestLaps.driver', 'circuitFastestLapDriver')
      .leftJoinAndSelect(
        'circuitFastestLapDriver.country',
        'circuitFastestLapDriverCountry',
      )
      .leftJoinAndSelect(
        'circuitFastestLaps.raceEvent',
        'circuitFastestLapRaceEvent',
      )
      .leftJoinAndSelect(
        'circuitFastestLapRaceEvent.championshipDetails',
        'circuitFastestLapChampionshipDetails',
      )
      .leftJoinAndSelect(
        'circuitFastestLapChampionshipDetails.championship',
        'circuitFastestLapChampionship',
      );
  }

  /**
   * Add sorting to the query builder.
   */
  private addSorting(
    qb: SelectQueryBuilder<RaceEvent>,
    sort: RaceEventSortOptions,
  ): void {
    const direction = sort === RaceEventSortOptions.DESC ? 'DESC' : 'ASC';
    qb.orderBy('raceEvent.dateStart', direction).addOrderBy(
      'raceEvent.dateEnd',
      direction,
    );
  }
}
