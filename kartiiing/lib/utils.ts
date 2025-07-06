import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  addYears,
  addMonths,
} from "date-fns";
import { CATEGORY_ORDER } from "@/lib/constants/categories";

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

/**
 * Sorts categories based on the predefined CATEGORY_ORDER
 * Categories not in the order list are placed at the end
 */
export function sortCategoriesByOrder<T>(
  items: T[],
  getCategoryName: (item: T) => string
): T[] {
  return items.sort((a, b) => {
    const aCategory = getCategoryName(a);
    const bCategory = getCategoryName(b);
    const ai = CATEGORY_ORDER.indexOf(aCategory);
    const bi = CATEGORY_ORDER.indexOf(bCategory);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}