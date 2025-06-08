import PageHeader from "@/components/PageHeader";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";

type Props = {
  filteredRaces: RaceEventGrouped[];
};

function buildCalendarDescription(races: RaceEventGrouped[]): string {
  const uniqueCircuits = Array.from(
    new Set(races.map((r) => r.location.circuit.id))
  ).length;

  const uniqueChampionships = Array.from(
    new Set(
      races.map((r) => `${r.championship.name} ${r.championship.nameSeries}`)
    )
  ).length;

  return `Discover our ${new Date().getFullYear()} karting calendar, featuring ${
    races.length
  } races across ${uniqueCircuits} circuits, representing ${uniqueChampionships} championships.`;
}

export default function CalendarHeader({ filteredRaces }: Props) {
  return (
    <PageHeader
      title="Calendar"
      description={buildCalendarDescription(filteredRaces)}
    />
  );
}
