"use client";

import PageHeader from "@/components/shared/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  description: string;
  selectedYear: number | string;
  setSelectedYear: (year: number | string) => void;
  years: (number | string)[];
};

export default function CalendarHeader({
  description,
  selectedYear,
  setSelectedYear,
  years,
}: Props) {
  const formatYearDisplay = (year: number | string) => {
    return year === "all" ? "All Years" : year;
  };

  return (
    <PageHeader
      title="Calendar"
      description={description}
      headerAction={
        <Select
          value={selectedYear.toString()}
          onValueChange={(val: string) => setSelectedYear(val)}
        >
          <SelectTrigger
            className="w-29 h-10.5! cursor-pointer font-semibold text-[1rem]"
            aria-label="Select year to view racing calendar"
            suppressHydrationWarning
          >
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
                className="cursor-pointer h-10"
              >
                {formatYearDisplay(year)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    />
  );
}
