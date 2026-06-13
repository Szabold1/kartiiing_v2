"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { IFastestLap } from "@kartiiing/shared";
import { formatDate, cn, lightDarkGlassBase } from "@/lib/utils";
import CategoryBadge from "@/components/shared/badges/CategoryBadge";
import Badge from "@/components/shared/badges/Badge";
import DriverInfo from "@/components/shared/race-data/DriverInfo";
import LapTime from "@/components/shared/race-data/LapTime";

type Props = {
  lap: IFastestLap;
  variant?: "expandable" | "compact";
  isExpanded?: boolean; // Only used when variant="expandable"
  onToggle?: () => void; // Only used when variant="expandable"
  className?: string;
};

export default function FastestLapCard({
  lap,
  variant = "expandable",
  isExpanded = false,
  onToggle,
  className,
}: Props) {
  if (variant === "compact") {
    return (
      <article
        className={cn(
          "flex flex-col gap-2.5 p-2.5 rounded-2xl",
          lightDarkGlassBase,
          className,
        )}
      >
        <div className="flex gap-1.5 justify-between">
          {lap.eventTitle ? (
            <Badge>{lap.eventTitle}</Badge>
          ) : (
            <Badge>{lap.sessionType}</Badge>
          )}
          <Badge className="whitespace-nowrap">{formatDate(lap.date)}</Badge>
        </div>
        <div className="flex items-end justify-between">
          <DriverInfo name={lap.driverName} country={lap.driverCountry} />
          <LapTime time={lap.lapTime} className="ml-1" />
        </div>
      </article>
    );
  }

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
          onToggle?.();
        }
      }}
      aria-expanded={isExpanded}
      aria-label={`${lap.category} – ${lap.lapTime}ms. ${isExpanded ? "Hide" : "Show"} details`}
    >
      {/* Header row: category badge + date badge + lap time + chevron */}
      <div className="flex items-center gap-1.5">
        <CategoryBadge label={lap.category} engineType={lap.engineType} />
        <Badge className="whitespace-nowrap">
          {formatDate(lap.date, false)}
        </Badge>

        <LapTime time={lap.lapTime} className="ml-auto" />

        {isExpanded ? (
          <ChevronUp className={chevronClasses} />
        ) : (
          <ChevronDown className={chevronClasses} />
        )}
      </div>

      {isExpanded && (
        <div className="flex items-center justify-between">
          <DriverInfo name={lap.driverName} country={lap.driverCountry} />
          <Badge>{lap.sessionType}</Badge>
        </div>
      )}
    </article>
  );
}
