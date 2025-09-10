import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { grayGlassBase, lightDarkGlassBase } from "@/lib/classNames";
import { CalendarViewMode } from "@/lib/constants/calendar";

interface Props {
  viewMode: CalendarViewMode;
  setViewMode: (mode: CalendarViewMode) => void;
  className?: string;
}

export default function GridListViewToggle({
  viewMode,
  setViewMode,
  className = "",
}: Props) {
  const options = [
    {
      value: CalendarViewMode.GRID,
      icon: <Grid className="size-4" />,
      label: "Grid view",
    },
    {
      value: CalendarViewMode.LIST,
      icon: <List className="size-4" />,
      label: "List view",
    },
  ];

  return (
    <div
      className={`hidden lg:flex items-center p-0.5 rounded-lg h-9 ${lightDarkGlassBase} ${className}`}
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="outline"
          aria-label={opt.label}
          noHover
          className={`w-7.5 h-7.5 border-transparent shadow-none ${
            viewMode === opt.value ? grayGlassBase : "opacity-60"
          }`}
          onClick={() => setViewMode(opt.value)}
        >
          {opt.icon}
        </Button>
      ))}
    </div>
  );
}
