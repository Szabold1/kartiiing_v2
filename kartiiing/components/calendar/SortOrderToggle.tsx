import { Button } from "@/components/ui/button";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { cn, lightDarkGlassHover } from "@/lib/utils";
import { RaceEventSortOptions } from "@kartiiing/shared";

type Props = {
  sortOrder: RaceEventSortOptions;
  onToggle: () => void;
  className?: string;
}

export function SortOrderToggle({
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
      className={cn("w-10.5 h-10.5 rounded-lg", lightDarkGlassHover, className)}
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
