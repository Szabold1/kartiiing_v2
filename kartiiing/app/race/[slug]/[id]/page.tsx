import { Metadata } from "next";
import { getRaceEventById } from "@/lib/api";
import RaceDetails from "@/components/race/RaceDetails";
import ErrorState from "@/components/shared/ErrorState";
import { getRaceUrl, SITE_URL } from "@/lib/utils";

interface Props {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

/**
 * Generate metadata for race event page
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: idStr } = await params;
  const errorReturn = {
    title: "Race Event - Kartiiing",
    description: "View race event details",
  };

  try {
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
      return errorReturn;
    }

    const race = await getRaceEventById(id);

    // TODO: Add dynamic OG image generation for race
    return {
      title: race.seoData.title,
      description: race.seoData.description,
      keywords: race.seoData.keywords,
      openGraph: {
        url: `${SITE_URL}${getRaceUrl(race)}`,
        type: "article",
        // image: race.seoData.openGraph?.image,
      },
      // twitter: {
      //   image: race.seoData.twitter?.image,
      // },
    };
  } catch {
    return errorReturn;
  }
}

export default async function RaceDetailPage({ params }: Props) {
  const { id: idStr } = await params;

  try {
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
      return <ErrorState message="Invalid race event ID" />;
    }

    const race = await getRaceEventById(id);
    return <RaceDetails race={race} />;
  } catch {
    return <ErrorState message="Failed to load race event." />;
  }
}
