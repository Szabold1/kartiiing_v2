"use client";

import { ChevronDown, ChevronUp, Umbrella, Wind } from "lucide-react";
import { cn, formatDate, lightDarkGlassHover } from "@/lib/utils";
import { formatValue } from "@/lib/utils/weatherUtils";
import MetricTile from "@/components/shared/MetricTile";
import WeatherIcon from "@/components/weather/WeatherIcon";
import type { IWeatherDataDay } from "@kartiiing/shared";

type Props = {
  day: IWeatherDataDay;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
};

export default function WeatherDayCard({
  day,
  isExpanded,
  onToggle,
  className,
}: Props) {
  const conditionName = day.condition?.name || "Unknown";
  const hasGust = day.wind.gust != null;
  const windValue = hasGust
    ? `${formatValue(day.wind.speed)} - ${formatValue(day.wind.gust)} km/h`
    : formatValue(day.wind.speed, "km/h");
  const chevronClasses = cn("h-4 w-4 shrink-0 text-muted-foreground/40");

  return (
    <article
      className={cn(
        "flex flex-col gap-2.5 p-2.5 rounded-2xl cursor-pointer transition",
        className,
      )}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isExpanded}
      aria-label={`${formatDate(day.date, false)}: ${conditionName}, ${formatValue(day.temp.avg, "℃")}. ${isExpanded ? "Hide" : "Show"} details`}
    >
      {/* Header row: icon + date/condition + temperature + chevron */}
      <div className="flex items-center gap-2.5">
        <WeatherIcon condition={day.condition} />

        <div className="flex flex-col gap-0 min-w-0">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            {formatDate(day.date, false)}
          </p>
          <p className="truncate text-sm font-medium">{conditionName}</p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="text-right flex flex-col tracking-tight">
            <p className="text-sm font-bold leading-tight">
              {formatValue(day.temp.avg, "℃")}
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              {formatValue(day.temp.min)} – {formatValue(day.temp.max, "℃")}
            </p>
          </div>

          {isExpanded ? (
            <ChevronUp className={chevronClasses} />
          ) : (
            <ChevronDown className={chevronClasses} />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="flex gap-1.5 flex-nowrap overflow-x-auto">
          <MetricTile
            icon={<Umbrella className="h-3 w-3" aria-hidden="true" />}
            value={formatValue(day.precipitationMm, "mm")}
            title={`Precipitation: ${formatValue(day.precipitationMm, "mm")}`}
          />

          <MetricTile
            icon={<Wind className="h-3.5 w-3.5" aria-hidden="true" />}
            value={windValue}
            title={`Wind: ${windValue}`}
          />
        </div>
      )}
    </article>
  );
}
