import { ICoordinates, IWeatherDataDay } from '@kartiiing/shared';

export interface IWeatherProvider {
  /**
   * Fetch daily weather data for the given coordinates and date strings.
   * @param coordinates Latitude and longitude for the location.
   * @param dates Dates to fetch in YYYY-MM-DD format.
   * @return A map where the keys are date strings (YYYY-MM-DD) and the values are weather data for that date.
   */
  fetchDailyWeather(
    coordinates: ICoordinates,
    dates: string[],
  ): Promise<Map<string, IWeatherDataDay>>;
}

export const WEATHER_PROVIDER = 'WEATHER_PROVIDER';
