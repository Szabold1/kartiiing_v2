import {
  RaceEventSortOptions,
  IRaceEvent,
  IRaceEventDetail,
  IPaginatedResponse,
  IYearStats,
} from "@kartiiing/shared-types";

/**
 * Get the base URL for API requests
 */
export function getApiBase(): string {
  const base = process.env.NEXT_PUBLIC_API_URL || "/api";
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
export async function getYearStats(year: number | string): Promise<IYearStats> {
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
  search?: string,
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

/**
 * Fetch a single race event by slug
 */
export async function getRaceEventBySlug(slug: string): Promise<IRaceEventDetail> {
  const encodedSlug = encodeURIComponent(slug);
  const url = `${getApiBase()}/race-events/detail/${encodedSlug}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch race event: ${res.status}`);
  }

  return res.json();
}
