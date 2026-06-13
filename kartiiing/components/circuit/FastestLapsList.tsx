"use client";

import { useState } from "react";
import { cn, lightDarkGlassActive, lightDarkGlassOnlyHover } from "@/lib/utils";
import FastestLapCard from "@/components/circuit/FastestLapCard";
import type { IFastestLap } from "@kartiiing/shared";

type Props = {
  fastestLaps: IFastestLap[];
  className?: string;
};

export default function FastestLapsList({
  fastestLaps,
  className = "",
}: Props) {
  const [expandedLaps, setExpandedLaps] = useState<Record<string, boolean>>(
    () => {
      if (!fastestLaps || fastestLaps.length === 0) return {};
      const fastest = fastestLaps.reduce((prev, curr) =>
        curr.lapTime < prev.lapTime ? curr : prev,
      );
      return {
        [fastest.category]: true,
      };
    },
  );

  if (!fastestLaps || fastestLaps.length === 0) return null;

  const toggleLap = (category: string) => {
    setExpandedLaps((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className={cn("space-y-1", className)}>
      {fastestLaps.map((lap) => (
        <FastestLapCard
          key={lap.category}
          lap={lap}
          isExpanded={expandedLaps[lap.category] === true}
          onToggle={() => toggleLap(lap.category)}
          className={`border border-transparent ${lightDarkGlassOnlyHover} ${expandedLaps[lap.category] ? lightDarkGlassActive : ""}`}
        />
      ))}
    </div>
  );
}
