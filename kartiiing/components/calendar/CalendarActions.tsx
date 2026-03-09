import SortOrderToggle from "./SortOrderToggle";
import NextRaceBtn from "./NextRaceBtn";
import GridListViewToggle from "./GridListViewToggle";
import {
  IRaceEvent,
  RaceEventSortOptions,
  RaceStatus,
} from "@kartiiing/shared-types";

type Props = {
  sortOrder: RaceEventSortOptions;
  onSortChange: () => void;
  races: IRaceEvent[];
  small?: boolean;
};

export default function CalendarActions({
  sortOrder,
  onSortChange,
  races,
  small = false,
}: Props) {
  // Calculate from races
  const hasLiveOrUpNext = races.some(
    (r) => r.status === RaceStatus.LIVE || r.status === RaceStatus.UPNEXT,
  );

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
      <GridListViewToggle />
      {alwaysDisplay()}
    </div>
  );
}
