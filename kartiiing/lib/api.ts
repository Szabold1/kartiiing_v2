import {
  RaceEventSortOptions,
  IRaceEvent,
  IPaginatedResponse,
} from "@kartiiing/shared-types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Fetch available years that have race events
 */
export async function getAvailableYears(): Promise<number[]> {
  const res = await fetch(`${apiUrl}/api/race-events/years`);

  if (!res.ok) {
    throw new Error(`Failed to fetch available years: ${res.status}`);
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

  let url = `${apiUrl}/api/race-events/${year || ""}?sort=${sort}&limit=100`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch races: ${res.status}`);
  }

  return res.json();
}
