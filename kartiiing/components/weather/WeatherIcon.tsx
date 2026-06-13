"use client";

import { useMemo } from "react";
import { cn, grayGlassBase } from "@/lib/utils";
import type { IWeatherCondition } from "@kartiiing/shared";
import { getWeatherVisual } from "@/lib/utils/weatherUtils";

type Props = {
  condition: IWeatherCondition | undefined;
  className?: string;
};

export default function WeatherIcon({ condition, className = "" }: Props) {
  const { icon: Icon, className: iconColor } = useMemo(
    () => getWeatherVisual(condition),
    [condition],
  );

  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg",
        grayGlassBase,
        className,
      )}
    >
      <Icon className={cn("h-4 w-4", iconColor)} aria-hidden="true" />
    </div>
  );
}
