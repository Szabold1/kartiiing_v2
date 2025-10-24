import { Controller, Get, Param, Query } from '@nestjs/common';
import { RaceEventsService } from './race-events.service';
import { FindByYearParams, FindRaceEventsQuery } from './dtos';
import { IRaceEvent, IPaginatedResponse } from '@kartiiing/shared-types';

@Controller('race-events')
export class RaceEventsController {
  constructor(private readonly raceEventsService: RaceEventsService) {}

  @Get()
  findAll(
    @Query() query: FindRaceEventsQuery,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    const raceEvents = this.raceEventsService.findAll(query);
    return raceEvents;
  }

  @Get('years')
  async getAvailableYears(): Promise<number[]> {
    const years = await this.raceEventsService.getAvailableYears();
    return years;
  }

  @Get(':year')
  findByYear(
    @Param() params: FindByYearParams,
    @Query() query: FindRaceEventsQuery,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    const raceEvents = this.raceEventsService.findByYear(params.year, query);
    return raceEvents;
  }
}
