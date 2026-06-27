import { GridViewToggle } from "@/components/shared/GridViewToggle";
import { SortOrderToggle } from "./SortOrderToggle";
import { NextRaceBtn } from "./NextRaceBtn";
import { Grid, List } from "lucide-react";
import { CalendarViewMode } from "@/lib/constants/calendar";
import { useCalendarStore } from "@/lib/stores/calendarStore";
import {
  IRaceEvent,
  RaceEventSortOptions,
  RaceStatus,
} from "@kartiiing/shared";

type Props = {
  sortOrder: RaceEventSortOptions;
  onSortChange: () => void;
  races: IRaceEvent[];
  small?: boolean;
};

export function CalendarActions({
  sortOrder,
  onSortChange,
  races,
  small = false,
}: Props) {
  const { viewMode, setViewMode } = useCalendarStore();

  // Calculate from races
  const hasLiveOrUpNext = races.some(
    (r) => r.status === RaceStatus.LIVE || r.status === RaceStatus.UPNEXT,
  );

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
      <>
        <SortOrderToggle sortOrder={sortOrder} onToggle={onSortChange} />
        {hasLiveOrUpNext && <NextRaceBtn races={races} />}
      </>
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
