import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Circuit } from '../entities/circuit.entity';
import { FastestLap } from '../entities/fastestLap.entity';
import { FindCircuitsQuery } from './dtos';

@Injectable()
export class CircuitsPersistence {
  constructor(
    @InjectRepository(Circuit)
    private readonly circuitRepo: Repository<Circuit>,
    @InjectRepository(FastestLap)
    private readonly fastestLapRepo: Repository<FastestLap>,
  ) {}

  /**
   * Builds the base query for listing circuits with pagination and optional search.
   * Returns the query builder with applied filters so the caller can paginate or count.
   */
  createFilteredCircuitQuery(
    query: FindCircuitsQuery,
  ): SelectQueryBuilder<Circuit> {
    const qb = this.circuitRepo
      .createQueryBuilder('circuit')
      .leftJoinAndSelect('circuit.country', 'country')
      .leftJoinAndSelect('circuit.layouts', 'layouts')
      .orderBy('circuit.locationName', 'ASC');

    this.applySearchFilter(qb, query.search);

    return qb;
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

  /**
   * Applies the standard circuit text-search filter to a query builder.
   * Matches against circuit name, locationName, and country name (accent-insensitive).
   */
  private applySearchFilter(
    qb: SelectQueryBuilder<Circuit>,
    search: string | undefined,
  ): void {
    if (!search) return;
    const term = `%${search}%`;
    qb.andWhere(
      `(unaccent(circuit.name) ILIKE unaccent(:term) 
        OR unaccent(circuit.locationName) ILIKE unaccent(:term) 
        OR unaccent(country.name) ILIKE unaccent(:term))`,
      { term },
    );
  }
}
