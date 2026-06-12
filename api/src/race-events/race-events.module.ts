import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceEventsController } from './race-events.controller';
import { RaceEventsService } from './race-events.service';
import { RaceEventPersistence } from './race-events.persistence';
import { RaceEvent } from '../entities/raceEvent.entity';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [TypeOrmModule.forFeature([RaceEvent]), WeatherModule],
  controllers: [RaceEventsController],
  providers: [RaceEventsService, RaceEventPersistence],
})
export class RaceEventsModule {}
