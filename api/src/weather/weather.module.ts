import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircuitWeatherDay } from '../entities/circuitWeatherDay.entity';
import { RaceEvent } from '../entities/raceEvent.entity';
import { WeatherService } from './weather.service';
import { VisualCrossingWeatherService } from './visual-crossing/visual-crossing-weather.service';
import { WEATHER_PROVIDER } from './weather.provider';
import { WeatherPersistence } from './weather.persistence';

@Module({
  imports: [TypeOrmModule.forFeature([CircuitWeatherDay, RaceEvent])],
  providers: [
    WeatherService,
    WeatherPersistence,
    {
      provide: WEATHER_PROVIDER,
      useClass: VisualCrossingWeatherService,
    },
  ],
  exports: [WeatherService],
})
export class WeatherModule {}
