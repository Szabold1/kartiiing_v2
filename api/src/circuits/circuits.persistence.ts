import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Circuit } from '../entities/circuit.entity';
import { FastestLap } from '../entities/fastestLap.entity';
import { FindCircuitsQuery } from './dtos';
import { CircuitsOrderPreset } from '@kartiiing/shared';

@Injectable()
export class CircuitsPersistence {
  constructor(
    @InjectRepository(Circuit)
    private readonly circuitRepo: Repository<Circuit>,
    @InjectRepository(FastestLap)
    private readonly fastestLapRepo: Repository<FastestLap>,
  ) {}

  /**
   * Paginated circuit listing with filters, search, and ordering.
   * For DISTANCE presets, uses getRawAndEntities to capture the computed
   * distance column (typeORM's getMany doesn't return addSelect columns).
   * Returns entities with an optional distance property, and the total count.
   */
  async findCircuits(
    query: FindCircuitsQuery,
    skip: number,
    take: number,
  ): Promise<{
    entities: (Circuit & { distance?: number })[];
    totalCount: number;
  }> {
    const qb = this.createFilteredCircuitQuery(query);
    const totalCount = await qb.getCount();

    const dataQb = this.createFilteredCircuitQuery(query);

    if (this.shouldUseDistance(query.preset)) {
      const raw = await dataQb.skip(skip).take(take).getRawAndEntities();
      return { entities: this.attachDistanceToEntities(raw), totalCount };
    }

    const entities = await dataQb.skip(skip).take(take).getMany();
    return { entities, totalCount };
  }

  /**
   * Find a single circuit by ID with country and layouts relations.
   */
  async findCircuitById(id: number): Promise<Circuit | null> {
    return this.circuitRepo.findOne({
      where: { id },
      relations: ['country', 'layouts'],
    });
  }

  /**
   * Find all circuits with minimal data for map marker coordinates.
   * Optionally filtered by search query (matched against name, locationName, country name).
   */
  async findCoordinates(search?: string): Promise<Circuit[]> {
    const qb = this.circuitRepo
      .createQueryBuilder('circuit')
      .select(['circuit.id', 'circuit.latitude', 'circuit.longitude'])
      .leftJoin('circuit.country', 'country');

    this.applySearchFilter(qb, search);

    return qb.getMany();
  }

  /**
   * Get the total number of circuits in the database.
   */
  async countCircuits(): Promise<number> {
    return this.circuitRepo.count();
  }

  /**
   * Get the count of distinct countries that have circuits.
   */
  async countDistinctCountries(): Promise<number> {
    const result = await this.circuitRepo
      .createQueryBuilder('circuit')
      .select('COUNT(DISTINCT circuit.countryId)', 'count')
      .getRawOne<{ count: string }>();
    return parseInt(result?.count || '0', 10);
  }

  // --------------------------------------------------- //
  // --- Private Methods ------------------------------- //

  /**
   * Builds the base query for listing circuits with filters and ordering.
   */
  private createFilteredCircuitQuery(
    query: FindCircuitsQuery,
  ): SelectQueryBuilder<Circuit> {
    const qb = this.circuitRepo
      .createQueryBuilder('circuit')
      .leftJoinAndSelect('circuit.country', 'country')
      .leftJoinAndSelect('circuit.layouts', 'layouts');

    this.applySearchFilter(qb, query.search);
    this.applyOrder(qb, query);

    return qb;
  }

  /**
   * Applies the standard circuit text-search filter to a query builder.
   * Splits the query into words and requires every word to match at least one
   * searchable column (circuit name, locationName, country name).
   * Uses accent-insensitive ILIKE so queries like "spain valencia" work.
   */
  private applySearchFilter(
    qb: SelectQueryBuilder<Circuit>,
    search: string | undefined,
  ): void {
    if (!search) return;

    const words = search.trim().split(/\s+/);
    if (words.length === 0) return;

    for (let i = 0; i < words.length; i++) {
      const paramKey = `term_${i}`;
      const term = `%${words[i]}%`;
      qb.andWhere(
        `(unaccent(circuit.name) ILIKE unaccent(:${paramKey})
          OR unaccent(circuit.locationName) ILIKE unaccent(:${paramKey})
          OR unaccent(country.name) ILIKE unaccent(:${paramKey}))`,
        { [paramKey]: term },
      );
    }
  }

  /**
   * Applies dynamic ordering based on the CircuitsOrderPreset.
   * For DISTANCE presets, requires userLatitude and userLongitude.
   */
  private applyOrder(
    qb: SelectQueryBuilder<Circuit>,
    query: FindCircuitsQuery,
  ): void {
    const preset = query.preset ?? CircuitsOrderPreset.LOCATION_ASC;

    if (this.shouldUseDistance(preset)) {
      const lat = query.userLatitude;
      const lng = query.userLongitude;

      if (lat == null || lng == null) {
        qb.addOrderBy('circuit.locationName', 'ASC');
        return;
      }

      const distanceFormula = this.buildDistanceExpression(lat, lng);
      qb.addSelect(distanceFormula, 'distance');
      const direction =
        preset === CircuitsOrderPreset.DISTANCE_ASC ? 'ASC' : 'DESC';
      qb.addOrderBy('distance', direction);
      return;
    }

    switch (preset) {
      case CircuitsOrderPreset.LOCATION_ASC:
        qb.addOrderBy('circuit.locationName', 'ASC');
        break;
      case CircuitsOrderPreset.LOCATION_DESC:
        qb.addOrderBy('circuit.locationName', 'DESC');
        break;
      case CircuitsOrderPreset.LENGTH_ASC:
        qb.addOrderBy('circuit.length', 'ASC');
        break;
      case CircuitsOrderPreset.LENGTH_DESC:
        qb.addOrderBy('circuit.length', 'DESC');
        break;
      default:
        qb.addOrderBy('circuit.locationName', 'ASC');
    }
  }

  /**
   * Returns true when the preset requires distance-based ordering and data.
   */
  private shouldUseDistance(preset: CircuitsOrderPreset | undefined): boolean {
    return (
      preset === CircuitsOrderPreset.DISTANCE_ASC ||
      preset === CircuitsOrderPreset.DISTANCE_DESC
    );
  }

  /**
   * Extracts the computed distance column from getRawAndEntities raw results
   * and attaches it to each entity. PostgreSQL returns numeric values as strings,
   * so we parse them with parseFloat.
   */
  private attachDistanceToEntities(raw: {
    raw: unknown[];
    entities: Circuit[];
  }): (Circuit & { distance?: number })[] {
    return raw.entities.map((entity, i) => {
      const rawRow = raw.raw[i] as Record<string, unknown> | undefined;
      const rawDistance = rawRow?.['distance'];
      const distance =
        typeof rawDistance === 'string' || typeof rawDistance === 'number'
          ? Number(rawDistance)
          : undefined;

      return Object.assign(entity, { distance });
    });
  }

  /**
   * Builds a SQL expression for the great-circle distance (spherical law of cosines,
   * equivalent to Haversine) between the user's location and a circuit's coordinates.
   * Formula: 6371 × acos( cos(lat₁) × cos(lat₂) × cos(Δlng) + sin(lat₁) × sin(lat₂) )
   * where angles are in radians and 6371 is Earth's mean radius in km.
   */
  private buildDistanceExpression(lat: number, lng: number): string {
    const R = 6371;
    return `(${R} * acos(cos(radians(${lat})) * cos(radians(circuit.latitude)) * cos(radians(circuit.longitude) - radians(${lng})) + sin(radians(${lat})) * sin(radians(circuit.latitude))))`;
  }
}
