import RaceCard from "@/components/calendar/RaceCard";
import Loader from "@/components/shared/Loader";
import { lightDarkGlassBase } from "@/lib/classNames";
import { IRaceEvent } from "@kartiiing/shared-types";
import { CalendarViewMode } from "@/lib/constants/calendar";
import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/lib/stores/calendarStore";
import ErrorState from "@/components/shared/ErrorState";

type Props = {
  races: IRaceEvent[];
  loading: boolean;
  sectionWidth: number;
};

export default function RacesGrid({ races, loading, sectionWidth }: Props) {
  const viewMode = useCalendarStore((state) => state.viewMode);
  const showListView =
    viewMode === CalendarViewMode.LIST && sectionWidth >= 850;

  const columnCount = Math.min(races.length, 4);
  const gap = 20;
  const cardWidth = 16.9 * 16;
  const containerWidth =
    1.25 * columnCount * cardWidth + (columnCount - 1) * gap;

  if (loading) {
    return <Loader />;
  }

  if (races.length === 0) {
    return <ErrorState message="No races found" />;
  }

  return (
    <div
      style={{ maxWidth: `${containerWidth}px` }}
      className={cn(
        showListView
          ? cn(
              "flex flex-col",
              lightDarkGlassBase,
              "p-1.5 rounded-[1.1rem] dark:bg-neutral-900",
            )
          : "grid justify-center gap-5 grid-cols-[repeat(auto-fit,minmax(16.9rem,1fr))]",
      )}
    >
      {races.map((race) => (
        <RaceCard
          key={race.id}
          race={race}
          variant={showListView ? "row" : "card"}
        />
      ))}
    </div>
  );
}
