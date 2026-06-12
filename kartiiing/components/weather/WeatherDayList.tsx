"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import WeatherDayCard from "@/components/weather/WeatherDayCard";
import type { IWeatherDataDay } from "@kartiiing/shared";

type Props = {
  days: IWeatherDataDay[];
  className?: string;
};

export default function WeatherDayList({ days, className = "" }: Props) {
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>(
    () => {
      return days.length > 0 ? { [days[days.length - 1].date]: true } : {};
    },
  );

  if (!days || days.length === 0) return null;

  const toggleDay = (date: string) => {
    setExpandedDays((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  return (
    <div className={cn("space-y-1", className)}>
      {days.map((day) => (
        <WeatherDayCard
          key={day.date}
          day={day}
          isExpanded={expandedDays[day.date] === true}
          onToggle={() => toggleDay(day.date)}
          className={`border border-transparent hover:border-gray-500/45 ${expandedDays[day.date] ? "border-gray-500/25" : ""}`}
        />
      ))}
    </div>
  );
}
