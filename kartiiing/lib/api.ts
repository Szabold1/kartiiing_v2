import {
  RaceEventSortOptions,
  IRaceEvent,
  IPaginatedResponse,
  IYearStats,
} from "@kartiiing/shared-types";

/**
 * Get the base URL for API requests based on the environment, supporting both client and server contexts.
 */
export function getApiBase(): string {
  const isClient = typeof window !== "undefined";
  let base: string;
  
  if (isClient) {
    base = process.env.NEXT_PUBLIC_API_URL || "/api";
  } else {
    base = process.env.API_URL_INTERNAL || "/api";
  }

  return base.replace(/\/$/, "");
}

/**
 * Fetch available years that have race events
 */
export async function getAvailableYears(): Promise<number[]> {
  const res = await fetch(`${getApiBase()}/race-events/years`);

  if (!res.ok) {
    throw new Error(`Failed to fetch available years: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch year statistics (races, circuits, championships count)
 */
export async function getYearStats(
  year: number | string
): Promise<IYearStats> {
  const res = await fetch(`${getApiBase()}/race-events/stats/${year}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch year stats: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch race events
 */
export async function getRaceEvents(
  year?: string,
  sort: RaceEventSortOptions = RaceEventSortOptions.ASC,
  search?: string
): Promise<IPaginatedResponse<IRaceEvent>> {
  if (year && year !== "all" && isNaN(parseInt(year))) {
    throw new Error("Invalid year parameter");
  }

  const yearPath = year && year !== "all" ? `/${year}` : "";
  let url = `${getApiBase()}/race-events${yearPath}?sort=${sort}&limit=100`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch races: ${res.status}`);
  }

  return res.json();
}
