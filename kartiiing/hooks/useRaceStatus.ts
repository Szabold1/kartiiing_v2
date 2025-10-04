import { useMemo } from "react";
import { RaceEventGrouped, RaceDate } from "@/lib/types/RaceTypes";
import { toDay } from "@/lib/utils";
import { RaceStatus } from "@/lib/constants/raceStatus";

/**
 * Returns the date object (start and end) of the next race (with the soonest future start date).
 * @param races
 * @returns RaceDate | null
 */
function getNextRaceDate(races: RaceEventGrouped[]): RaceDate | null {
  const today = toDay(new Date());
  const futureRaces = races.filter((r) => toDay(r.date.start) >= today);

  if (futureRaces.length === 0) return null;

  const nextRace = futureRaces.reduce((prev, curr) =>
    toDay(prev.date.start) < toDay(curr.date.start) ? prev : curr
  );

  return nextRace.date;
}

/**
 *
 * @param date The date of the race, which contains start and end dates
 * @param nextRaceDate The start and end date of the next race
 * @returns RaceStatus | null
 */
function getRaceStatus(
  date: RaceDate,
  nextRaceDate: RaceDate | null
): RaceStatus | null {
  const today = toDay(new Date());
  const startDate = toDay(date.start);
  const endDate = toDay(date.end);
  const nextRaceStartDate = nextRaceDate ? toDay(nextRaceDate.start) : null;
  const nextRaceEndDate = nextRaceDate ? toDay(nextRaceDate.end) : null;

  if (!startDate) {
    if (today.getTime() === endDate.getTime()) return RaceStatus.LIVE;
    return null;
  }

  if (today >= startDate && today <= endDate) return RaceStatus.LIVE;
  if (
    nextRaceStartDate &&
    nextRaceEndDate &&
    today < startDate &&
    startDate >= nextRaceStartDate &&
    startDate <= nextRaceEndDate
  ) {
    return RaceStatus.UPNEXT;
  }
  if (endDate < today) return RaceStatus.FINISHED;
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
        return status === RaceStatus.LIVE;
      }),
    [races, getRaceStatusForRace]
  );

  const nextRaces = useMemo(
    () =>
      races.filter((race) => {
        const status = getRaceStatusForRace(race);
        return status === RaceStatus.UPNEXT;
      }),
    [races, getRaceStatusForRace]
  );

  const finishedRaces = useMemo(
    () =>
      races.filter((race) => {
        const status = getRaceStatusForRace(race);
        return status === RaceStatus.FINISHED;
      }),
    [races, getRaceStatusForRace]
  );

  return {
    nextRaceDate,
    liveRaces,
    nextRaces,
    finishedRaces,
    getRaceStatusForRace,
  };
}
