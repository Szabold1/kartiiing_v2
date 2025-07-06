import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  addYears,
  addMonths,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // Normalize accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s]/gi, "") // Optional: remove special characters
    .trim();
}

export function toDay(dateInput: string | Date): Date {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getRaceStatus(
  startDate: Date,
  endDate: Date,
  upcomingDate: Date | null
): "Live" | "Upcoming" | "Finished" | null {
  const today = toDay(new Date());

  if (!startDate) {
    if (today.getTime() === endDate.getTime()) return "Live";
    return null;
  }

  if (today >= startDate && today <= endDate) return "Live";
  if (today < startDate && endDate.getTime() === upcomingDate?.getTime())
    return "Upcoming";
  if (endDate < today) return "Finished";
  return null;
}

/**
 * Returns the end date of the next race from races (including today).
 *
 * @param races
 * @returns Date | null
 */
export function getNextUpcomingRaceDate(
  races: RaceEventGrouped[]
): Date | null {
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
 * Returns a human-readable relative text for the given start and end dates.
 * It calculates the difference in years, months, and days, and formats it accordingly.
 *
 * @param startDate - The start date of the event.
 * @param endDate - The end date of the event.
 * @returns A string representing the relative time until the start or since the end of the event. E.g., "starts in 2 months, 3 days" or "1 year, 5 months and 10 days ago".
 */
export function getRelativeText(startDate: Date, endDate: Date): string {
  const today = toDay(new Date());
  const daysToStart = differenceInDays(toDay(startDate), today);
  const daysToEnd = differenceInDays(toDay(endDate), today);

  const getFormattedDuration = (targetDate: Date, isPast: boolean = false) => {
    const referenceDate = isPast ? today : targetDate;
    const comparisonDate = isPast ? targetDate : today;

    const years = differenceInYears(referenceDate, comparisonDate);
    const months = differenceInMonths(referenceDate, comparisonDate) % 12;

    let remainingDate = new Date(comparisonDate);
    remainingDate = addYears(remainingDate, years);
    remainingDate = addMonths(remainingDate, months);
    const days = differenceInDays(referenceDate, remainingDate);

    const parts = [];

    if (years > 0) {
      parts.push(`${years} year${years === 1 ? "" : "s"}`);
    }
    if (months > 0) {
      parts.push(`${months} month${months === 1 ? "" : "s"}`);
    }
    if (days > 0 || parts.length === 0) {
      parts.push(`${days} day${days === 1 ? "" : "s"}`);
    }

    if (parts.length === 1) {
      return parts[0];
    } else if (parts.length === 2) {
      return `${parts[0]} and ${parts[1]}`;
    } else {
      return `${parts[0]}, ${parts[1]} and ${parts[2]}`;
    }
  };

  if (daysToStart > 0) {
    const duration = getFormattedDuration(toDay(startDate));
    return `starts in ${duration}`;
  } else if (daysToEnd < 0) {
    const duration = getFormattedDuration(toDay(endDate), true);
    return `${duration} ago`;
  } else {
    return "live now";
  }
}
