import { MetadataRoute } from "next";
import { getMinimalRaceEvents } from "@/lib/api";
import { getRaceUrl } from "@/lib/utils/raceUtils";
import { safeParseDate } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kartiiing.com";

// Static pages
const staticPages: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/calendar`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/results`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/circuits`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/wiki`,
    changeFrequency: "yearly",
    priority: 0.7,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const races = await getMinimalRaceEvents();

    // Dynamic race event pages
    const racePages: MetadataRoute.Sitemap = races.map((race) => {
      const endDate = safeParseDate(race.date?.end);
      const isPast = endDate ? endDate < new Date() : false;

      return {
        url: `${BASE_URL}${getRaceUrl(race)}`,
        lastModified: safeParseDate(race.updatedAt || race.date?.end),
        changeFrequency: isPast ? "yearly" : "weekly",
        priority: isPast ? 0.7 : 0.8,
      };
    });

    return [...staticPages, ...racePages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
