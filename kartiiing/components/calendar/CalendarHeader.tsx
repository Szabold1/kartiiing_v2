import PageHeader from "@/components/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRaceEvent } from "@kartiiing/shared-types";

type Props = {
  races: IRaceEvent[];
  selectedYear: number | string;
  setSelectedYear: (year: number | string) => void;
  years: (number | string)[];
};

export default function CalendarHeader({
  races,
  selectedYear,
  setSelectedYear,
  years,
}: Props) {
  const buildCalendarDescription = () => {
    const uniqueCircuits = Array.from(
      new Set(races.map((r) => r.circuit.id))
    ).length;

    const uniqueChampionships = Array.from(
      new Set(
        races.flatMap((r) => 
          r.championships.map((c) => `${c.nameShort} ${c.nameSeries}`)
        )
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
            {years.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
                className="cursor-pointer"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    />
  );
}
