import {
  getAvailableYears,
  getRaceEvents,
  getCalendarMetadata,
} from "@/lib/api";
import { CalendarClient } from "./calendar-client";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { RaceEventSortOptions } from "@kartiiing/shared";
import { SITE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    year: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
};

/**
 * Generate metadata for the calendar page
 */
export async function generateMetadata({ params }: Props) {
  const { year } = await params;

  try {
    const metadata = await getCalendarMetadata(year);

    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      openGraph: {
        url: `${SITE_URL}/calendar/${year}`,
        type: "website",
        // image: metadata.openGraph?.image || DEFAULT_OG_IMAGE,
      },
      // twitter: {
      //   image: metadata.twitter?.image || DEFAULT_OG_IMAGE,
      // },
    };
  } catch (error) {
    console.error("Error generating calendar metadata:", error);

    const yearDisplay = year === "all" ? "All Years" : year;
    return {
      title: `${yearDisplay} Calendar - Kartiiing`,
      description: `Karting race calendar for ${yearDisplay}. View upcoming and past events.`,
      keywords: `karting calendar, ${yearDisplay} karting calendar, races, events`,
      openGraph: {
        url: `${SITE_URL}/calendar/${year}`,
        type: "website",
      },
    };
  }
}

export default async function CalendarPage({ params, searchParams }: Props) {
  const { year } = await params;
  const { sort } = await searchParams;

  const sortOrder = (sort as RaceEventSortOptions) || RaceEventSortOptions.ASC;
  const racesRes = await getRaceEvents({
    year: year,
    sort: sortOrder,
    page: 1,
    limit: 20,
  });
  const availableYears = await getAvailableYears();
  const years = ["all", ...availableYears] as (string | number)[];

  let description = "Race calendar - view upcoming and past events.";
  try {
    const metadata = await getCalendarMetadata(year);
    description = metadata.description;
  } catch (error) {
    console.error("Error fetching calendar metadata:", error);
  }

  return (
    <PageWrapper>
      <CalendarHeader
        description={description}
        selectedYear={year}
        years={years}
      />
      <CalendarClient
        initialData={racesRes}
        year={year}
        initialSort={sortOrder}
      />
    </PageWrapper>
  );
}
