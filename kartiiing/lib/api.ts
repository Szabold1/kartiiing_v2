import {
  RaceEventSortOptions,
  IRaceEvent,
  IRaceEventDetail,
  IPaginatedResponse,
  ISeoData,
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
 * Fetch calendar metadata for a specific year
 */
export async function getCalendarMetadata(
  year: number | string,
): Promise<ISeoData> {
  const res = await fetch(
    `${getApiBase()}/race-events/calendar-metadata/${year}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch calendar metadata: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch race events
 */
export async function getRaceEvents(options?: {
  year?: string;
  sort?: RaceEventSortOptions;
  search?: string;
  limit?: number;
  page?: number;
}): Promise<IPaginatedResponse<IRaceEvent>> {
  const {
    year,
    sort = RaceEventSortOptions.ASC,
    search,
    limit = 100,
    page = 1,
  } = options || {};

  if (year && year !== "all" && isNaN(parseInt(year))) {
    throw new Error("Invalid year parameter");
  }

  const yearPath = year && year !== "all" ? `/${year}` : "";
  let url = `${getApiBase()}/race-events${yearPath}?sort=${sort}&limit=${limit}&page=${page}`;
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
 * Fetch a single race event by ID
 */
export async function getRaceEventById(id: number): Promise<IRaceEventDetail> {
  const url = `${getApiBase()}/race-events/by-id/${id}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch race event: ${res.status}`);
  }

  return res.json();
}
