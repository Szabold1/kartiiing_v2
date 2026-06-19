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
    const { search } = query;

    const qb = this.circuitRepo
      .createQueryBuilder('circuit')
      .leftJoinAndSelect('circuit.country', 'country')
      .leftJoinAndSelect('circuit.layouts', 'layouts')
      .orderBy('circuit.locationName', 'ASC');

    if (search) {
      const term = `%${search}%`;
      qb.andWhere(
        `(unaccent(circuit.name) ILIKE unaccent(:term) 
          OR unaccent(circuit.locationName) ILIKE unaccent(:term) 
          OR unaccent(country.name) ILIKE unaccent(:term))`,
        { term },
      );
    }

    return qb;
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
}
