import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ICircuit,
  ICircuitCoordinate,
  IPaginatedResponse,
  ISeoData,
} from '@kartiiing/shared';
import { toICircuit, toICircuitCoordinate } from './circuit.resource';
import { FindCircuitsQuery } from './dtos';
import { CircuitsPersistence } from './circuits.persistence';

@Injectable()
export class CircuitsService {
  constructor(private readonly persistence: CircuitsPersistence) {}

  async findAll(
    query: FindCircuitsQuery,
  ): Promise<IPaginatedResponse<ICircuit>> {
    const pageNumber = query.page ?? 1;
    const pageSize = query.limit ?? 20;
    const skip = (pageNumber - 1) * pageSize;

    const qb = this.persistence.createFilteredCircuitQuery(query);

    const totalItems = await qb.getCount();
    const circuits = await qb.skip(skip).take(pageSize).getMany();

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data: circuits.map(toICircuit),
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

  async findOne(id: number): Promise<ICircuit> {
    const circuit = await this.persistence.findCircuitById(id);
    if (!circuit) {
      throw new NotFoundException(`Circuit with ID ${id} not found`);
    }
    return toICircuit(circuit);
  }

  async getCoordinates(search?: string): Promise<ICircuitCoordinate[]> {
    const circuits = await this.persistence.findCoordinates(search);
    return circuits.map(toICircuitCoordinate);
  }

  async getCircuitsMetadata(): Promise<ISeoData> {
    const totalCircuits = await this.persistence.countCircuits();
    const totalCountries = await this.persistence.countDistinctCountries();

    return {
      title: 'Circuits - Kartiiing',
      description: `Explore our database of ${totalCircuits} karting circuits across ${totalCountries} countries.`,
      keywords:
        'karting circuits, kart tracks, racing circuits, go-kart tracks',
    };
  }
}
