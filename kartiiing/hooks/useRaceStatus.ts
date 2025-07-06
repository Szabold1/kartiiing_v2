import { useMemo } from "react";
import { RaceEventGrouped, RaceDate } from "@/lib/types/RaceTypes";
import { toDay } from "@/lib/utils";

/**
 * Returns the end date of the next race from races (including today).
 * @param races
 * @returns Date | null
 */
function getNextRaceDate(races: RaceEventGrouped[]): Date | null {
  const futureRaces = races.filter(
    (r) => toDay(r.date.end) >= toDay(new Date())
  );

  if (futureRaces.length === 0) return null;

  const nextRace = futureRaces.reduce((prev, curr) =>
    toDay(prev.date.end) < toDay(curr.date.end) ? prev : curr
  );

  return toDay(nextRace.date.end);
}

/**
 *
 * @param date The date of the race, which contains start and end dates
 * @param nextRaceDate The end date of the next race
 * @returns "Live" | "Upcoming" | "Finished" | null
 */
function getRaceStatus(
  date: RaceDate,
  nextRaceDate: Date | null
): "Live" | "Upcoming" | "Finished" | null {
  const today = toDay(new Date());
  const startDate = toDay(date.start);
  const endDate = toDay(date.end);

  if (!startDate) {
    if (today.getTime() === endDate.getTime()) return "Live";
    return null;
  }

  if (today >= startDate && today <= endDate) return "Live";
  if (today < startDate && endDate.getTime() === nextRaceDate?.getTime())
    return "Upcoming";
  if (endDate < today) return "Finished";
  return null;
}

/**
 * Hook to get race status related data.
 * @param races The races to filter and get the status for
 * @returns An object containing race status related data
 */
export function useRaceStatus(races: RaceEventGrouped[]) {
  const nextRaceDate = useMemo(() => getNextRaceDate(races), [races]);

  const getRaceStatusForRace = useMemo(
    () => (race: RaceEventGrouped) => getRaceStatus(race.date, nextRaceDate),
    [nextRaceDate]
  );

  const liveRaces = useMemo(
    () =>
      races.filter((race) => {
        const status = getRaceStatusForRace(race);
        return status === "Live";
      }),
    [races, getRaceStatusForRace]
  );

  const upcomingRaces = useMemo(
    () =>
      races.filter((race) => {
        const status = getRaceStatusForRace(race);
        return status === "Upcoming";
      }),
    [races, getRaceStatusForRace]
  );

  const finishedRaces = useMemo(
    () =>
      races.filter((race) => {
        const status = getRaceStatusForRace(race);
        return status === "Finished";
      }),
    [races, getRaceStatusForRace]
  );

  return {
    nextRaceDate,
    liveRaces,
    upcomingRaces,
    finishedRaces,
    getRaceStatusForRace,
  };
}
