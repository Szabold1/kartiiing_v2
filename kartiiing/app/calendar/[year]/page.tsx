import { getAvailableYears, getRaceEvents } from "@/lib/api";
import CalendarClient from "./calendar-client";
import { RaceEventSortOptions } from "@kartiiing/shared-types";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    year: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

/**
 * Generate metadata for the calendar page based on the year parameter
 */
export async function generateMetadata({ params }: Props) {
  const { year } = await params;

  return {
    title: year === "all" ? "Kartiiing - Calendar - All Years" : `Kartiiing - Calendar ${year}`,
    description: `Browse karting races ${
      year === "all" ? "from all years" : `for ${year}`
    }`,
  };
}

export default async function CalendarPage({ params, searchParams }: Props) {
  const { year } = await params;
  const { sort } = await searchParams;

  const sortOrder = (sort as RaceEventSortOptions) || RaceEventSortOptions.ASC;
  const racesRes = await getRaceEvents(year === "all" ? undefined : year, sortOrder);
  const years = await getAvailableYears();
  console.log('races', racesRes);

  return (
    <CalendarClient
      initialRaces={racesRes.data}
      year={year}
      initialSort={sortOrder}
      years={years}
    />
  );
}
