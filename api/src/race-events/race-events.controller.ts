import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { RaceEventsService } from './race-events.service';
import { YearParams, FindRaceEventsQuery } from './dtos';
import {
  IRaceEvent,
  IRaceEventDetail,
  IPaginatedResponse,
  IYearStats,
} from '@kartiiing/shared-types';

@Controller('race-events')
export class RaceEventsController {
  constructor(private readonly raceEventsService: RaceEventsService) {}

  @Get()
  async findAll(
    @Query() query: FindRaceEventsQuery,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    const raceEvents = await this.raceEventsService.findAll(query);
    return raceEvents;
  }

  @Get('years')
  async getAvailableYears(): Promise<number[]> {
    const years = await this.raceEventsService.getAvailableYears();
    return years;
  }

  @Get('stats/:year')
  async getYearStats(@Param() params: YearParams): Promise<IYearStats> {
    const stats = await this.raceEventsService.getYearStats(params.year);
    return {
      year: params.year,
      ...stats,
    };
  }

  @Get('by-id/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IRaceEventDetail> {
    return await this.raceEventsService.findById(id);
  }

  @Get(':year')
  async findByYear(
    @Param() params: YearParams,
    @Query() query: FindRaceEventsQuery,
  ): Promise<IPaginatedResponse<IRaceEvent>> {
    const raceEvents = await this.raceEventsService.findByYear(
      params.year,
      query,
    );
    return raceEvents;
  }
}
