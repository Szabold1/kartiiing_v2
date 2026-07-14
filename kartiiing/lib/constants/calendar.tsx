import { ArrowDown, ArrowUp, Grid, List } from "lucide-react";
import { CalendarOrderPreset } from "@kartiiing/shared";
import type { OrderPreset } from "@/components/shared/OrderDropdown";

export enum CalendarViewMode {
  GRID = "grid",
  LIST = "list",
}

export const CALENDAR_VIEW_MODE_KEY = "calendarViewMode";

export const CALENDAR_PRESETS: readonly OrderPreset<CalendarOrderPreset>[] = [
  {
    value: CalendarOrderPreset.ALL_ASC,
    label: "Date",
    icon: ArrowUp,
  },
  {
    value: CalendarOrderPreset.ALL_DESC,
    label: "Date",
    icon: ArrowDown,
  },
  {
    value: CalendarOrderPreset.UPCOMING,
    label: "Upcoming",
    icon: ArrowUp,
  },
  {
    value: CalendarOrderPreset.FINISHED,
    label: "Finished",
    icon: ArrowDown,
  },
] as const;

export const CALENDAR_VIEW_OPTIONS = [
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
] as const;
