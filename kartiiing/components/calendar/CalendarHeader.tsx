import PageHeader from "@/components/PageHeader";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  races: RaceEventGrouped[];
  selectedYear: number | string;
  setSelectedYear: (year: number | string) => void;
};

export default function CalendarHeader({
  races,
  selectedYear,
  setSelectedYear,
}: Props) {
  const buildCalendarDescription = () => {
    const uniqueCircuits = Array.from(
      new Set(races.map((r) => r.location.circuit.id))
    ).length;

    const uniqueChampionships = Array.from(
      new Set(
        races.map((r) => `${r.championship.name} ${r.championship.nameSeries}`)
      )
    ).length;

    return `Discover our ${selectedYear} karting calendar, featuring ${races.length} races across ${uniqueCircuits} circuits, representing ${uniqueChampionships} championships.`;
  };

  return (
    <PageHeader
      title="Calendar"
      description={buildCalendarDescription()}
      headerAction={
        <Select
          value={selectedYear.toString()}
          onValueChange={(val: string) => setSelectedYear(val)}
        >
          <SelectTrigger className="w-22 cursor-pointer font-semibold">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            <SelectItem value="2025" className="cursor-pointer">
              2025
            </SelectItem>
            <SelectItem value="2024" className="cursor-pointer">
              2024
            </SelectItem>
          </SelectContent>
        </Select>
      }
    />
  );
}
