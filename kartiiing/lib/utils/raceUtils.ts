import { IRaceEventMinimal, IFastestLap } from "@kartiiing/shared";

/**
 * Generate the URL for a race event page
 * @param race
 * @return URL string for the race event page (no domain)
 */
export function getRaceUrl(race: IRaceEventMinimal): string {
  return `/race/${race.slug}/${race.id}`;
}

/**
 * Returns the fastest lap from an array of fastest laps (smallest lapTime).
 * Returns null if the array is empty.
 */
export function getFastestLap(laps: IFastestLap[]): IFastestLap | null {
  if (laps.length === 0) return null;
  return laps.reduce((prev, curr) =>
    curr.lapTime < prev.lapTime ? curr : prev,
  );
}
