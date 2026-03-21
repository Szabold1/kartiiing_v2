import { IRaceEvent } from "@kartiiing/shared-types";

/**
 * Generate the URL for a race event page
 * @param race
 * @return URL string for the race event page (no domain)
 */
export function getRaceUrl(race: IRaceEvent): string {
  return `/race/${race.slug}/${race.id}`;
}
