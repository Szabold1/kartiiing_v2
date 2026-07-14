import { Injectable } from '@nestjs/common';
import { RaceEvent } from '../../entities/raceEvent.entity';
import { SEASON_TO_MONTHS, MONTH_NAMES } from './season-month.constants';

@Injectable()
export class RaceEventSearchService {
  /**
   * Filter events by search terms at the application level.
   * Uses a union of two passes so a term like "jun" can both filter by
   * June (date pass) AND match "junior" in category names (text pass).
   */
  applySearch(events: RaceEvent[], search: string): RaceEvent[] {
    const normalizedSearchTerms = search
      .split(/\s+/)
      .map((term) => this.normalizeString(term));

    if (normalizedSearchTerms.length === 0) return events;

    const seasonMonthTerms = this.extractSeasonMonthTerms(
      normalizedSearchTerms,
    );

    // Non-season/month terms for text matching in Path A.
    // Pure month searches (e.g. "september") have no otherTerms, so
    // Path A passes everything that passed the date gate.
    const otherTerms = normalizedSearchTerms.filter(
      (term) => !seasonMonthTerms.includes(term),
    );

    // Path A: date-filter by season/month terms, then text-match only
    // the non-season/month terms. Uses the full date range so events
    // crossing month boundaries (e.g. May 31 → June 2) still match.
    const dateFiltered = events.filter((event) =>
      this.matchesSeasonOrMonth(
        event.dateStart || '',
        event.dateEnd || '',
        seasonMonthTerms,
      ),
    );

    const pathA = dateFiltered.filter((event) =>
      this.eventMatchesEveryTerm(event, otherTerms),
    );

    // Path B: text-match by ALL terms (no date filter).
    // Catches cases like "jun" where the term matches both a month name
    // and a category name like "junior".
    const pathB = events.filter((event) =>
      this.eventMatchesEveryTerm(event, normalizedSearchTerms),
    );

    // Union by event ID, preserving original order
    const seen = new Set<number>();
    const result: RaceEvent[] = [];
    for (const event of [...pathA, ...pathB]) {
      if (!seen.has(event.id)) {
        seen.add(event.id);
        result.push(event);
      }
    }

    return result;
  }

  /**
   * Normalize a string by removing diacritics and converting to lowercase
   */
  normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Extract season and month terms from search terms.
   * Full or partial matches are allowed.
   */
  extractSeasonMonthTerms(normalizedTerms: string[]): string[] {
    return normalizedTerms.filter((term) => {
      if (Object.keys(SEASON_TO_MONTHS).some((season) => season.includes(term)))
        return true;
      return Object.values(MONTH_NAMES).some((month) => month.includes(term));
    });
  }

  /**
   * Check if an event's date range overlaps with season/month terms.
   * Takes both start and end dates so events crossing month/season
   * boundaries (e.g. May 31 → June 2 matching "june" or "summer")
   * are not missed. Handles year wrap-around for winter ranges.
   */
  matchesSeasonOrMonth(
    dateStart: string,
    dateEnd: string,
    seasonMonthTerms: string[],
  ): boolean {
    if (seasonMonthTerms.length === 0) return true;

    const startMonth = new Date(dateStart || '').getMonth() + 1;
    const endMonth = new Date(dateEnd || '').getMonth() + 1;

    // Collect all months in the inclusive range, handling year wrap-around
    const eventMonths = this.getMonthsInRange(startMonth, endMonth);

    return seasonMonthTerms.some((term) =>
      eventMonths.some((month: number) => {
        const monthName: string = MONTH_NAMES[month];
        // Check season match
        const seasonKeys = Object.keys(SEASON_TO_MONTHS);
        for (const season of seasonKeys) {
          const seasonMonths = SEASON_TO_MONTHS[season];
          if (season.includes(term) && seasonMonths.includes(month)) {
            return true;
          }
        }
        // Check month name match
        return monthName?.includes(term) ?? false;
      }),
    );
  }

  /**
   * Get all month numbers in the inclusive range from startMonth to endMonth.
   * Handles year wrap-around (e.g. December=12 → February=2 returns [12, 1, 2]).
   */
  getMonthsInRange(startMonth: number, endMonth: number): number[] {
    const months: number[] = [];
    if (endMonth >= startMonth) {
      // Normal range: e.g. May(5) → July(7) = [5, 6, 7]
      for (let m = startMonth; m <= endMonth; m++) {
        months.push(m);
      }
    } else {
      // Wrap-around range: e.g. December(12) → February(2) = [12, 1, 2]
      for (let m = startMonth; m <= 12; m++) {
        months.push(m);
      }
      for (let m = 1; m <= endMonth; m++) {
        months.push(m);
      }
    }
    return months;
  }

  /**
   * Check if an event matches ALL of the given search terms against
   * championship, category, circuit, and year fields.
   */
  eventMatchesEveryTerm(event: RaceEvent, terms: string[]): boolean {
    if (terms.length === 0) return true;

    return terms.every((term) => {
      const championshipMatch = event.championshipDetails?.some(
        (detail) =>
          this.normalizeString(detail.championship.nameShort || '').includes(
            term,
          ) ||
          this.normalizeString(detail.championship.nameLong || '').includes(
            term,
          ) ||
          this.normalizeString(detail.championship.nameSeries || '').includes(
            term,
          ),
      );

      const categoryMatch = event.categories?.some(
        (cat) =>
          this.normalizeString(cat.name || '').includes(term) ||
          this.normalizeString(cat.engineType || '').includes(term),
      );

      const circuitMatch =
        this.normalizeString(event.circuit?.locationName || '').includes(
          term,
        ) ||
        this.normalizeString(event.circuit?.name || '').includes(term) ||
        this.normalizeString(event.circuit?.country?.name || '').includes(term);

      const yearMatch = new Date(event.dateStart || '')
        .getFullYear()
        .toString()
        .includes(term);

      return championshipMatch || categoryMatch || circuitMatch || yearMatch;
    });
  }
}
