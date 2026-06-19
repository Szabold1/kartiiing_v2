import { Controller, Get, Query } from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { FindCircuitsQuery } from './dtos';
import { ICircuit, IPaginatedResponse, ISeoData } from '@kartiiing/shared';

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Get('metadata')
  async getMetadata(): Promise<ISeoData> {
    return this.circuitsService.getCircuitsMetadata();
  }

  @Get()
  async findAll(
    @Query() query: FindCircuitsQuery,
  ): Promise<IPaginatedResponse<ICircuit>> {
    return this.circuitsService.findAll(query);
  }
}
