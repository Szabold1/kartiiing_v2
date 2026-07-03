import { ArrowDown, ArrowUp, Grid, List } from "lucide-react";
import { GridViewToggle } from "@/components/shared/GridViewToggle";
import {
  OrderDropdown,
  type OrderPreset,
} from "@/components/shared/OrderDropdown";
import { CalendarViewMode } from "@/lib/constants/calendar";
import { useCalendarStore } from "@/lib/stores/calendarStore";
import { CalendarOrderPreset } from "@kartiiing/shared";

const CALENDAR_PRESETS: readonly OrderPreset<CalendarOrderPreset>[] = [
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

type Props = {
  preset: CalendarOrderPreset;
  onPresetChange: (preset: CalendarOrderPreset) => void;
  small?: boolean;
};

export function CalendarActions({
  preset,
  onPresetChange,
  small = false,
}: Props) {
  const { viewMode, setViewMode } = useCalendarStore();

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

  const alwaysDisplay = () => {
    return (
      <OrderDropdown
        value={preset}
        onChange={onPresetChange}
        presets={CALENDAR_PRESETS}
        className="text-foreground"
      />
    );
  };

  if (small) {
    return <div className="flex items-center gap-2">{alwaysDisplay()}</div>;
  }

  return (
    <div className="flex items-center gap-2 h-9.5">
      <GridViewToggle
        viewMode={viewMode}
        setViewMode={setViewMode}
        options={options}
      />
      {alwaysDisplay()}
    </div>
  );
}
