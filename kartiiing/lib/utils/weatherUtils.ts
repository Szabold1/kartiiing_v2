import {
  Cloud,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { IWeatherCondition } from "@kartiiing/shared";

/**
 * Maps Visual Crossing icon names to our internal representation. This allows us to decouple our UI from the specific icon naming of the API and also to handle cases where the API might not provide an icon but we can infer it from the condition name.
 */
enum VisualCrossingIcon {
  Snow = "snow",
  Rain = "rain",
  Fog = "fog",
  Wind = "wind",
  Cloudy = "cloudy",
  PartlyCloudyDay = "partly-cloudy-day",
  PartlyCloudyNight = "partly-cloudy-night",
  ClearDay = "clear-day",
  ClearNight = "clear-night",
}

type WeatherVisual = {
  icon: LucideIcon;
  className: string;
};

/**
 * A mapping of weather condition keys to their corresponding icon components and color classes. This is used by the getWeatherVisual function to return the appropriate visual representation for a given weather condition.
 */
const WEATHER_VISUALS: Record<VisualCrossingIcon, WeatherVisual> = {
  [VisualCrossingIcon.ClearDay]: {
    icon: Sun,
    className: "text-amber-500 dark:text-amber-400",
  },
  [VisualCrossingIcon.ClearNight]: {
    icon: Sun,
    className: "text-amber-500 dark:text-amber-400",
  },
  [VisualCrossingIcon.PartlyCloudyDay]: {
    icon: CloudSun,
    className: "text-amber-400 dark:text-amber-300",
  },
  [VisualCrossingIcon.PartlyCloudyNight]: {
    icon: CloudSun,
    className: "text-amber-400 dark:text-amber-300",
  },
  [VisualCrossingIcon.Cloudy]: {
    icon: Cloud,
    className: "text-slate-500 dark:text-slate-300",
  },
  [VisualCrossingIcon.Fog]: {
    icon: CloudFog,
    className: "text-slate-400 dark:text-slate-300",
  },
  [VisualCrossingIcon.Wind]: {
    icon: Wind,
    className: "text-cyan-500 dark:text-cyan-400",
  },
  [VisualCrossingIcon.Rain]: {
    icon: CloudRain,
    className: "text-blue-500 dark:text-blue-400",
  },
  [VisualCrossingIcon.Snow]: {
    icon: CloudSnow,
    className: "text-sky-300 dark:text-sky-200",
  },
};

function isVisualCrossingIcon(value: string): value is VisualCrossingIcon {
  const VISUAL_CROSSING_ICON_VALUES = new Set<string>(
    Object.values(VisualCrossingIcon),
  );
  return VISUAL_CROSSING_ICON_VALUES.has(value);
}

/**
 * If the condition is a valid Visual Crossing icon, return it directly. Otherwise, try to infer the icon based on keywords in the condition name.
 */
function getWeatherKey(
  condition: IWeatherCondition | undefined,
): VisualCrossingIcon | null {
  if (!condition) return null;

  const icon = condition.icon?.trim().toLowerCase();
  if (icon && isVisualCrossingIcon(icon)) {
    return icon;
  }

  const name = condition.name?.trim().toLowerCase();
  if (!name) return null;

  if (/snow|sleet|ice|blizzard/.test(name)) return VisualCrossingIcon.Snow;
  if (/rain|shower|drizzle/.test(name)) return VisualCrossingIcon.Rain;
  if (/fog|mist|haze|smoke/.test(name)) return VisualCrossingIcon.Fog;
  if (/wind|breez/.test(name)) return VisualCrossingIcon.Wind;
  if (/partly|mostly|few\s*cloud/.test(name)) {
    return VisualCrossingIcon.PartlyCloudyDay;
  }
  if (/overcast|cloudy|cloud/.test(name)) return VisualCrossingIcon.Cloudy;
  if (/clear|sunny/.test(name)) return VisualCrossingIcon.ClearDay;

  return null;
}

/**
 * Given a weather condition, returns the corresponding icon component and color class for display.
 */
export function getWeatherVisual(
  condition: IWeatherCondition | undefined,
): WeatherVisual {
  const key = getWeatherKey(condition);

  if (!key) {
    return {
      icon: Cloud,
      className: "text-slate-500 dark:text-slate-300",
    };
  }

  return WEATHER_VISUALS[key];
}

/**
 * Formats a numeric value for display. Handles undefined/NaN gracefully.
 * If the value is a whole number, it will be displayed without decimal places. If it has a fractional part, it will be rounded to one decimal place. Optionally appends a unit string.
 */
export function formatValue(value: number | undefined, unit?: string): string {
  if (value == null || Number.isNaN(value)) return "-";
  const rounded = Math.round(value * 10) / 10;
  const display = Number.isInteger(rounded)
    ? `${rounded}`
    : `${Math.round(rounded)}`;
  return unit ? `${display} ${unit}` : display;
}
