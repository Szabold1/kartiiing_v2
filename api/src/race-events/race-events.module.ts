import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceEventsController } from './race-events.controller';
import { RaceEventsService } from './race-events.service';
import { RaceEvent } from '../entities/raceEvent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaceEvent])],
  controllers: [RaceEventsController],
  providers: [RaceEventsService],
})
export class RaceEventsModule {}
