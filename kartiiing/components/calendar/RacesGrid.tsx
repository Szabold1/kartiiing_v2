import RaceCard from "@/components/calendar/RaceCard";
import Loader from "@/components/shared/Loader";
import { IRaceEvent } from "@kartiiing/shared-types";
import { CalendarViewMode } from "@/lib/constants/calendar";
import { cn, lightDarkGlassBase } from "@/lib/utils";
import { useCalendarStore } from "@/lib/stores/calendarStore";
import ErrorState from "@/components/shared/ErrorState";

type Props = {
  races: IRaceEvent[];
  loading: boolean;
  sectionWidth: number;
  isAllYearsView?: boolean;
};

function getGridWidthClass(raceCount: number) {
  switch (raceCount) {
    case 1:
      return "max-w-[22rem]";
    case 2:
      return "max-w-[calc(2*22rem_+_1.25rem)]";
    default:
      return "max-w-full";
  }
}

function groupRacesByYear(
  races: IRaceEvent[],
): { year: number; races: IRaceEvent[] }[] {
  const grouped = new Map<number, IRaceEvent[]>();

  for (const race of races) {
    const year = race.date.year;
    if (!year) {
      console.warn(`Race with id ${race.id} is missing a year in its date`);
      continue;
    }
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(race);
  }

  // Maintain order of first appearance
  return Array.from(grouped.entries()).map(([year, races]) => ({
    year,
    races,
  }));
}

export default function RacesGrid({
  races,
  loading,
  sectionWidth,
  isAllYearsView = false,
}: Props) {
  const viewMode = useCalendarStore((state) => state.viewMode);
  const showListView =
    viewMode === CalendarViewMode.LIST && sectionWidth >= 850;

  if (loading) {
    return <Loader />;
  }

  if (races.length === 0) {
    return <ErrorState message="No races found" />;
  }

  const racesByYear = groupRacesByYear(races);
  const showYearHeaders = isAllYearsView || racesByYear.length > 1;

  return (
    <div className="space-y-8">
      {racesByYear.map(({ year, races: yearRaces }) => (
        <div key={year}>
          {showYearHeaders && (
            <h2 className="text-2xl font-bold mx-5 my-3">{year}</h2>
          )}
          <div
            className={cn(
              showListView
                ? cn(
                    "flex flex-col",
                    lightDarkGlassBase,
                    "p-1.5 rounded-[1.1rem] dark:bg-neutral-900",
                  )
                : cn(
                    "grid justify-center gap-5",
                    getGridWidthClass(yearRaces.length),
                    "grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(16.9rem,1fr))]",
                  ),
            )}
          >
            {yearRaces.map((race) => (
              <RaceCard
                key={race.id}
                race={race}
                variant={showListView ? "row" : "card"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
