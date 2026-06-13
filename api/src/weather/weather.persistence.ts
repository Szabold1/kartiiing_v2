import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWeatherDataDay } from '@kartiiing/shared';
import { CircuitWeatherDay } from '../entities/circuitWeatherDay.entity';
import { RaceEvent } from '../entities/raceEvent.entity';

@Injectable()
export class WeatherPersistence {
  constructor(
    @InjectRepository(CircuitWeatherDay)
    private readonly circuitWeatherRepo: Repository<CircuitWeatherDay>,
    @InjectRepository(RaceEvent)
    private readonly raceEventRepo: Repository<RaceEvent>,
  ) {}

  /**
   * Finds weather data for a specific circuit and date range.
   * Returns a map like { '2024-07-01' => CircuitWeatherDay, ... }.
   */
  async findWeatherDaysByCircuitAndRange(
    circuitId: number,
    start: string,
    end: string,
  ): Promise<Map<string, CircuitWeatherDay>> {
    const rows = await this.circuitWeatherRepo
      .createQueryBuilder('weather')
      .where('weather.circuitId = :circuitId', { circuitId })
      .andWhere('weather.date BETWEEN :dateStart AND :dateEnd', {
        dateStart: start,
        dateEnd: end,
      })
      .orderBy('weather.date', 'ASC')
      .getMany();

    return new Map(rows.map((row) => [row.date, row]));
  }

  /**
   * Saves weather data for a circuit. It performs an upsert based on circuitId and date, so it will insert new rows or update existing ones if the data has changed.
   */
  async saveCircuitWeatherDays(
    circuitId: number,
    datesToSave: string[],
    weatherByDate: Map<string, IWeatherDataDay>,
    existingByDate: Map<string, CircuitWeatherDay>,
  ): Promise<void> {
    const fetchedAt = new Date();

    const rows = datesToSave
      .map((date) => {
        const day = weatherByDate.get(date);
        if (!day) return null;

        const existingRow = existingByDate.get(date);

        return this.circuitWeatherRepo.create({
          id: existingRow?.id,
          circuitId,
          date,
          condition: day.condition.name,
          conditionIcon: day.condition.icon || undefined,
          fetchedAt,
          tempMin: day.temp.min,
          tempMax: day.temp.max,
          tempAvg: day.temp.avg,
          windSpeed: day.wind.speed,
          windGust: day.wind.gust,
          precipitationMm: day.precipitationMm,
        });
      })
      .filter((row): row is CircuitWeatherDay => row !== null);

    await this.circuitWeatherRepo.upsert(rows, {
      conflictPaths: ['circuitId', 'date'],
      skipUpdateIfNoValuesChanged: true,
    });
  }
}
