import { Inject, Injectable } from '@nestjs/common';
import {
  ICoordinates,
  IRaceEventDateMinimal,
  IWeatherDataDay,
  formatIsoDate,
} from '@kartiiing/shared';
import { CircuitWeatherDay } from '../entities/circuitWeatherDay.entity';
import { WEATHER_PROVIDER, type IWeatherProvider } from './weather.provider';
import { toIWeatherDataDay } from './weather.resource';
import { WeatherPersistence } from './weather.persistence';

@Injectable()
export class WeatherService {
  private readonly DAY_IN_MS = 24 * 60 * 60 * 1000;

  constructor(
    private readonly weatherPersistence: WeatherPersistence,
    @Inject(WEATHER_PROVIDER)
    private weatherProvider: IWeatherProvider,
  ) {}

  /**
   * Fetches weather data for a given circuit and date range. It first checks the database for existing weather data and determines which dates need to be fetched from the provider. It then saves any newly fetched data to the database and returns the combined results.
   */
  async getWeatherForCircuit(
    circuitId: number,
    raceDate: IRaceEventDateMinimal,
    coordinates: ICoordinates,
  ): Promise<IWeatherDataDay[]> {
    if (!this.checkDatesAreValid(raceDate)) return [];

    const eventDates = this.getDateRange(raceDate);
    if (eventDates.length === 0) return [];

    const nowDate = formatIsoDate(new Date());
    const dbDataByDates =
      await this.weatherPersistence.findWeatherDaysByCircuitAndRange(
        circuitId,
        raceDate.start,
        raceDate.end,
      );

    const datesToFetch = eventDates.filter((date) => {
      const existingRow = dbDataByDates.get(date);
      if (!existingRow) return true;
      return !this.shouldUseCachedWeather(date, existingRow.fetchedAt, nowDate);
    });

    if (datesToFetch.length === 0) {
      return this.buildWeatherResults(eventDates, dbDataByDates, new Map());
    }

    const fetchedWeatherData = await this.weatherProvider.fetchDailyWeather(
      coordinates,
      datesToFetch,
    );

    await this.weatherPersistence.saveCircuitWeatherDays(
      circuitId,
      datesToFetch,
      fetchedWeatherData,
      dbDataByDates,
    );

    return this.buildWeatherResults(
      eventDates,
      dbDataByDates,
      fetchedWeatherData,
    );
  }

  // --------------------------------------------------- //
  // --- Private methods ------------------------------- //

  /**
   * Checks if the given dates are valid for fetching weather data
   * (not more than 14 days in the future).
   */
  private checkDatesAreValid(dates: IRaceEventDateMinimal): boolean {
    const end = new Date(dates.end);
    const now = new Date();
    const maxPossibleDate = new Date(now.getTime() + 14 * this.DAY_IN_MS);
    const minPossibleDate = new Date('1980-01-01');

    if (end > maxPossibleDate) {
      console.warn(
        `Event end date ${dates.end} is more than 14 days in the future. Skipping weather fetch.`,
      );
      return false;
    }

    if (end < minPossibleDate) {
      console.warn(
        `Event end date ${dates.end} is before ${formatIsoDate(
          minPossibleDate,
        )}. Skipping weather fetch.`,
      );
      return false;
    }

    return true;
  }

  /**
   * Generates an array of date strings (YYYY-MM-DD) for each day in the given date range (inclusive).
   */
  private getDateRange(dates: IRaceEventDateMinimal): string[] {
    const start = new Date(dates.start);
    const end = new Date(dates.end);
    const dateArray: string[] = [];

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      dateArray.push(formatIsoDate(date));
    }

    return dateArray;
  }

  /**
   * Determines whether to use cached weather data based on the date and when it was fetched.
   * - For past dates: use cache only if fetchedAt is also in the past
   * - For future/today: use cache only if fetchedAt is today
   */
  private shouldUseCachedWeather(
    raceEventDate: string,
    fetchedAt: Date | null | undefined,
    nowDate: string,
  ): boolean {
    if (!fetchedAt) return false;

    const fetchedAtStr = formatIsoDate(fetchedAt);
    const isPastDate = raceEventDate < nowDate;

    if (isPastDate) {
      return fetchedAtStr > raceEventDate;
    } else {
      return fetchedAtStr === nowDate;
    }
  }

  /**
   * Builds the final weather results for the event by combining existing cached data and newly fetched data.
   */
  private buildWeatherResults(
    eventDates: string[],
    dbDataByDates: Map<string, CircuitWeatherDay>,
    fetchedDates: Map<string, IWeatherDataDay>,
  ): IWeatherDataDay[] {
    const resultsByDate = new Map<string, IWeatherDataDay>();

    for (const [date, row] of dbDataByDates.entries()) {
      resultsByDate.set(date, toIWeatherDataDay(row));
    }

    for (const [date, day] of fetchedDates.entries()) {
      resultsByDate.set(date, day);
    }

    return eventDates
      .map((date) => resultsByDate.get(date))
      .filter((row) => row !== undefined);
  }
}
