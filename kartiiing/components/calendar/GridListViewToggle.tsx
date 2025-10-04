import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { lightDarkGlassActive, lightDarkGlassBase } from "@/lib/classNames";
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
      className={`hidden lg:flex rounded-lg h-9 p-[0.09rem] ${lightDarkGlassBase} ${className}`}
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="outline"
          aria-label={opt.label}
          // noHover
          className={`w-[1.95rem] h-[1.95rem] border-transparent shadow-none dark:bg-transparent ${
            viewMode === opt.value ? lightDarkGlassActive : "opacity-60 hover:opacity-100"
          }`}
          onClick={() => setViewMode(opt.value)}
        >
          {opt.icon}
        </Button>
      ))}
    </div>
  );
}
