"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RaceEventSortOptions } from "@kartiiing/shared";

type Props = {
  description: string;
  selectedYear: number | string;
  years: (number | string)[];
};

export function CalendarHeader({ description, selectedYear, years }: Props) {
  const router = useRouter();

  const formatYearDisplay = (year: number | string) => {
    return year === "all" ? "All Years" : year;
  };

  const handleYearChange = (newYear: string) => {
    const yearString = newYear.toString();
    if (yearString === selectedYear.toString()) return;

    const currentUrl = new URL(window.location.href);
    const sortParam =
      currentUrl.searchParams.get("sort") || RaceEventSortOptions.ASC;
    router.push(`/calendar/${yearString}?sort=${sortParam}`);
  };

  return (
    <PageHeader
      title="Calendar"
      description={description}
      headerAction={
        <Select
          value={selectedYear.toString()}
          onValueChange={handleYearChange}
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
