'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  description: string;
  selectedYear: number | string;
  years: (number | string)[];
};

export function CalendarHeader({ description, selectedYear, years }: Props) {
  const router = useRouter();

  const formatYearDisplay = (year: number | string) => {
    return year === 'all' ? 'All Years' : year;
  };

  const handleYearChange = (newYear: string) => {
    const yearString = newYear.toString();
    if (yearString === selectedYear.toString()) return;

    router.push(`/calendar/${yearString}`);
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
            className="h-10.5! w-29 cursor-pointer text-[1rem] font-semibold"
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
                className="h-10 cursor-pointer"
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
