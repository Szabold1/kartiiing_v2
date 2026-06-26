import { Controller, Get, Param, Query } from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import {
  FindCircuitsQuery,
  FindCoordinatesQuery,
  CircuitIdParams,
} from './dtos';
import {
  ICircuit,
  ICircuitCoordinate,
  IPaginatedResponse,
  ISeoData,
} from '@kartiiing/shared';

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Get('metadata')
  async getMetadata(): Promise<ISeoData> {
    return this.circuitsService.getCircuitsMetadata();
  }

  @Get('coordinates')
  async getCoordinates(
    @Query() query: FindCoordinatesQuery,
  ): Promise<ICircuitCoordinate[]> {
    return this.circuitsService.getCoordinates(query.search);
  }

  @Get()
  async findAll(
    @Query() query: FindCircuitsQuery,
  ): Promise<IPaginatedResponse<ICircuit>> {
    return this.circuitsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param() params: CircuitIdParams): Promise<ICircuit> {
    return this.circuitsService.findOne(params.id);
  }
}
