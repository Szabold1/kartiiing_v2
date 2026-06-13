import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICoordinates, IWeatherDataDay, isNextDay } from '@kartiiing/shared';
import { IWeatherProvider } from '../weather.provider';
import {
  VisualCrossingResponse,
  toIWeatherDataDays,
} from './visual-crossing.resource';

@Injectable()
export class VisualCrossingWeatherService implements IWeatherProvider {
  private readonly apiKey: string;
  private readonly apiBaseUrl: string;
  private readonly apiTimeoutMs: number;

  constructor(private configService: ConfigService) {
    this.apiKey =
      this.configService.get<string>('VISUAL_CROSSING_API_KEY') || '';
    if (!this.apiKey) {
      console.warn(
        'Visual Crossing API key is not configured. Weather data will not be fetched.',
      );
    }

    this.apiBaseUrl = this.configService.get<string>(
      'VISUAL_CROSSING_BASE_URL',
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
    );
    this.apiTimeoutMs = Number(
      this.configService.get<number>('VISUAL_CROSSING_TIMEOUT_MS', 10000),
    );
  }

  /**
   * Fetches weather data for the given coordinates and dates.
   * Returns a map like { '2024-07-01' => IWeatherDataDay, ... }.
   */
  async fetchDailyWeather(
    coordinates: ICoordinates,
    dates: string[],
  ): Promise<Map<string, IWeatherDataDay>> {
    if (!this.apiKey || dates.length === 0) return new Map();

    const weatherByDate = new Map<string, IWeatherDataDay>();
    const dateRanges = this.getDateRanges(dates);

    for (const [start, end] of dateRanges) {
      const days = await this.fetchRange(coordinates, start, end);

      for (const day of days) {
        weatherByDate.set(day.date, day);
      }
    }

    return weatherByDate;
  }

  // --------------------------------------------------- //
  // --- Private methods ------------------------------- //

  /**
   * Fetches weather data for a given coordinate and date range from the Visual Crossing API.
   */
  private async fetchRange(
    coordinates: ICoordinates,
    startDate: string,
    endDate: string,
  ): Promise<IWeatherDataDay[]> {
    const url = this.getApiUrl(coordinates, startDate, endDate);

    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(this.apiTimeoutMs),
      });

      if (!response.ok) {
        const bodyText = await response.text();
        throw new Error(
          `Visual Crossing request failed (${response.status}): ${bodyText}`,
        );
      }

      const json = (await response.json()) as VisualCrossingResponse;

      return toIWeatherDataDays(json);
    } catch (err) {
      if (err instanceof Error && err.name === 'TimeoutError') {
        throw new Error(
          `Visual Crossing request timed out after ${this.apiTimeoutMs}ms`,
        );
      }
      throw err;
    }
  }

  /**
   * Constructs the Visual Crossing API URL for the given coordinates and date range.
   */
  private getApiUrl(
    coordinates: ICoordinates,
    startDate: string,
    endDate: string,
  ): string {
    const location = encodeURIComponent(
      `${coordinates.latitude},${coordinates.longitude}`,
    );
    const datesStr = `${startDate}/${endDate}`;
    const queryParams = new URLSearchParams({
      unitGroup: 'metric',
      include: 'days',
      key: this.apiKey,
      contentType: 'json',
    });
    return `${this.apiBaseUrl}/${location}/${datesStr}?${queryParams.toString()}`;
  }

  /**
   * Groups the input dates into contiguous ranges. For example, if the input is
   * ['2024-01-01', '2024-01-02', '2024-01-04'], this will return
   * [['2024-01-01', '2024-01-02'], ['2024-01-04', '2024-01-04']].
   * This allows us to minimize the number of API calls by fetching data for contiguous date ranges.
   */
  private getDateRanges(dates: string[]): Array<[string, string]> {
    const uniqueDates = [...new Set(dates)].sort();
    if (uniqueDates.length === 0) return [];

    const ranges: Array<[string, string]> = [];
    let rangeStart = uniqueDates[0];
    let rangeEnd = uniqueDates[0];

    for (let i = 1; i < uniqueDates.length; i++) {
      const currentDate = uniqueDates[i];
      const previousDate = rangeEnd;

      if (isNextDay(previousDate, currentDate)) {
        rangeEnd = currentDate;
        continue;
      }

      ranges.push([rangeStart, rangeEnd]);
      rangeStart = currentDate;
      rangeEnd = currentDate;
    }

    ranges.push([rangeStart, rangeEnd]);
    return ranges;
  }
}
