import { notFound } from "next/navigation";
import { getRaces, groupRaceEvents } from "@/lib/db";
import CalendarClient from "./calendar-client";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";

interface Props {
  params: Promise<{
    year: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

/**
 * Next.js will pre-render these pages at build time
 * TODO: In the future, fetch available years from database
 */
export async function generateStaticParams() {
  // TODO: Replace with database query to get actual years with races
  // const availableYears = await getAvailableRaceYears();
  // return [
  //   { year: "all" }, 
  //   ...availableYears.map((year) => ({ year }))
  // ];

  return [
    { year: "2025" },
    { year: "2024" },
  ];
}

// Server-side data fetching
async function getRaceData(
  year: string,
  sort: "asc" | "desc" = "asc"
): Promise<RaceEventGrouped[]> {
  try {
    // Validate year parameter
    if (year !== "all" && isNaN(parseInt(year))) {
      notFound();
    }

    const races = await getRaces(year === "all" ? undefined : year, sort);
    return groupRaceEvents(races);
  } catch (error) {
    console.error("Error fetching races:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { year } = await params;

  return {
    title: year === "all" ? "Calendar - All Years" : `Calendar ${year}`,
    description: `Browse karting races ${
      year === "all" ? "from all years" : `for ${year}`
    }`,
  };
}

export default async function CalendarPage({ params, searchParams }: Props) {
  const { year } = await params;
  const { sort } = await searchParams;
  const sortOrder = (sort as "asc" | "desc") || "asc";
  const races = await getRaceData(year, sortOrder);

  return (
    <CalendarClient initialRaces={races} year={year} initialSort={sortOrder} />
  );
}
