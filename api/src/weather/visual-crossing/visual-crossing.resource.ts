import { IWeatherDataDay } from '@kartiiing/shared';

interface VisualCrossingDay {
  datetime: string;
  tempmin?: number;
  tempmax?: number;
  temp?: number;
  windspeed?: number;
  windgust?: number;
  precip?: number;
  conditions?: string;
  icon?: string;
}

export interface VisualCrossingResponse {
  days?: VisualCrossingDay[];
}

/**
 * Converts a Visual Crossing day object to the internal IWeatherDataDay format.
 */
function toIWeatherDataDay(day: VisualCrossingDay): IWeatherDataDay | null {
  if (!day.datetime) return null;

  return {
    date: day.datetime,
    condition: {
      name: day.conditions || 'Unknown',
      icon: day.icon || undefined,
    },
    temp: {
      min: day.tempmin ?? 0,
      max: day.tempmax ?? 0,
      avg: day.temp,
    },
    wind: {
      speed: day.windspeed,
      gust: day.windgust,
    },
    precipitationMm: day.precip,
  };
}

/**
 * Converts the Visual Crossing API response to an array of IWeatherDataDay objects, filtering out any invalid entries.
 */
export function toIWeatherDataDays(
  visualCrossingResponse: VisualCrossingResponse,
): IWeatherDataDay[] {
  const days = Array.isArray(visualCrossingResponse.days)
    ? visualCrossingResponse.days
    : [];

  return days
    .map(toIWeatherDataDay)
    .filter((day): day is IWeatherDataDay => day !== null);
}
