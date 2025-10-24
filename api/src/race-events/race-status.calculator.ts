import { RaceStatus } from '@kartiiing/shared-types';

export interface RaceDate {
  start: string;
  end: string;
}

export class RaceStatusCalculator {
  /**
   * Converts a date string to a Date object with time set to start of day
   */
  private static toDay(date: string | Date): Date {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  /**
   * Returns the date object (start and end) of the next race (with the soonest future start date).
   */
  static getNextRaceDate(races: { date: RaceDate }[]): RaceDate | null {
    const today = this.toDay(new Date());
    const futureRaces = races.filter((r) => this.toDay(r.date.start) > today);

    if (futureRaces.length === 0) return null;

    const nextRace = futureRaces.reduce((prev, curr) =>
      this.toDay(prev.date.start) < this.toDay(curr.date.start) ? prev : curr,
    );

    return nextRace.date;
  }

  /**
   * Calculates the status of a race based on its date and the next race date
   */
  static getRaceStatus(
    date: RaceDate,
    nextRaceDate: RaceDate | null,
  ): RaceStatus | null {
    const today = this.toDay(new Date());
    const startDate = this.toDay(date.start);
    const endDate = this.toDay(date.end);
    const nextRaceStartDate = nextRaceDate
      ? this.toDay(nextRaceDate.start)
      : null;
    const nextRaceEndDate = nextRaceDate ? this.toDay(nextRaceDate.end) : null;

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
   * Calculates statuses for all races in a collection
   */
  static calculateStatusesForRaces<T extends { date: RaceDate }>(
    races: T[],
  ): Map<T, RaceStatus | null> {
    const nextRaceDate = this.getNextRaceDate(races);
    const statusMap = new Map<T, RaceStatus | null>();

    const tempStatuses: Array<{ race: T; status: RaceStatus | null }> = [];
    for (const race of races) {
      const status = this.getRaceStatus(race.date, nextRaceDate);
      tempStatuses.push({ race, status });
    }

    // If any race is LIVE, do not allow any race to be UPNEXT
    const hasLive = tempStatuses.some(
      (item) => item.status === RaceStatus.LIVE,
    );
    for (const { race, status } of tempStatuses) {
      if (hasLive && status === RaceStatus.UPNEXT) {
        statusMap.set(race, null);
      } else {
        statusMap.set(race, status);
      }
    }

    return statusMap;
  }
}
