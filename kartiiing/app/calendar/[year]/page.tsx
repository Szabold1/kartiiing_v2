import {
  getAvailableYears,
  getRaceEvents,
  getCalendarMetadata,
} from "@/lib/api";
import CalendarClient from "./calendar-client";
import { RaceEventSortOptions } from "@kartiiing/shared-types";
import { SITE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    year: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

/**
 * Generate metadata for the calendar page
 */
export async function generateMetadata({ params }: Props) {
  const { year } = await params;
  const metadata = await getCalendarMetadata(
    year === "all" ? new Date().getFullYear() : year,
  );

  // TODO: Add dynamic OG image generation for calendar page
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
}

export default async function CalendarPage({ params, searchParams }: Props) {
  const { year } = await params;
  const { sort } = await searchParams;

  const sortOrder = (sort as RaceEventSortOptions) || RaceEventSortOptions.ASC;
  const racesRes = await getRaceEvents({
    year: year === "all" ? undefined : year,
    sort: sortOrder,
  });
  const years = await getAvailableYears();
  const metadata = await getCalendarMetadata(
    year === "all" ? new Date().getFullYear() : year,
  );

  return (
    <CalendarClient
      initialRaces={racesRes.data}
      year={year}
      initialSort={sortOrder}
      years={years}
      description={metadata.description}
    />
  );
}
