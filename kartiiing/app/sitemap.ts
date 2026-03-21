import { MetadataRoute } from "next";
import { getRaceEvents } from "@/lib/api";
import { getRaceUrl } from "@/lib/utils/raceUtils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kartiiing.com";
const now = new Date();

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
    const races = await getRaceEvents();

    // Dynamic race event pages
    const racePages: MetadataRoute.Sitemap = races.data.map((race) => {
      const endDate = new Date(race.date?.end || now);
      const isPast = endDate < now;

      return {
        url: `${BASE_URL}${getRaceUrl(race)}`,
        lastModified: new Date(race.updatedAt || race.date?.end || now),
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
