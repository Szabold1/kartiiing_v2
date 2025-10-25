import { Button } from "@/components/ui/button";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { lightDarkGlassHover } from "@/lib/classNames";
import React from "react";
import { RaceEventSortOptions } from "@kartiiing/shared-types";

interface Props {
  sortOrder: RaceEventSortOptions;
  onToggle: () => void;
  className?: string;
}

export default function SortOrderToggle({
  sortOrder,
  onToggle,
  className = "",
}: Props) {
  return (
    <Button
      variant="outline"
      aria-label={`Sort by date ${
        sortOrder === RaceEventSortOptions.ASC ? "ascending" : "descending"
      }`}
      className={`w-9 h-9 ${lightDarkGlassHover} ${className}`}
      onClick={onToggle}
      title={`Sort by date ${
        sortOrder === RaceEventSortOptions.ASC ? "ascending" : "descending"
      }`}
    >
      {sortOrder === RaceEventSortOptions.ASC ? (
        <ArrowDownUp className="size-4" />
      ) : (
        <ArrowUpDown className="size-4" />
      )}
    </Button>
  );
}
