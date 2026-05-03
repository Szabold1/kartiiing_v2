import { IWeatherDataDay } from '@kartiiing/shared';
import { CircuitWeatherDay } from '../entities/circuitWeatherDay.entity';

/**
 * Converts a CircuitWeatherDay entity to the IWeatherDataDay DTO format.
 */
export function toIWeatherDataDay(entity: CircuitWeatherDay): IWeatherDataDay {
  return {
    date: entity.date,
    condition: {
      name: entity.condition,
      icon: entity.conditionIcon,
    },
    temp: {
      min: entity.tempMin,
      max: entity.tempMax,
      avg: entity.tempAvg,
    },
    wind: {
      speed: entity.windSpeed,
      gust: entity.windGust,
    },
    humidity: entity.humidity,
    precipitationMm: entity.precipitationMm,
  };
}
