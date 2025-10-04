import { Button } from "@/components/ui/button";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { lightDarkGlassHover } from "@/lib/classNames";
import React from "react";
import { SortOrder } from "@/lib/constants/calendar";

interface Props {
  sortOrder: SortOrder;
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
        sortOrder === SortOrder.ASC ? "ascending" : "descending"
      }`}
      className={`w-9 h-9 ${lightDarkGlassHover} ${className}`}
      onClick={onToggle}
      title={`Sort by date ${sortOrder === SortOrder.ASC ? "ascending" : "descending"}`}
    >
      {sortOrder === SortOrder.ASC ? (
        <ArrowDownUp className="size-4" />
      ) : (
        <ArrowUpDown className="size-4" />
      )}
    </Button>
  );
}
