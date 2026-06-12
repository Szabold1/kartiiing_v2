import { format, parseISO, addDays, isSameDay } from "date-fns";

/**
 * Converts a date input (string or Date) to a Date object representing the start of that day (00:00:00).
 * @param dateInput - The date input, either as a string or a Date object.
 * @returns A Date object set to the start of the given day.
 */
export function toDay(dateInput: string | Date): Date {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Formats a date string into a more readable format.
 * @param dateString - The date string to format.
 * @param withYear - Whether to include the year in the formatted output. Defaults to true.
 * @returns The formatted date string (e.g. "4 May 2025" or "4 May").
 */
export function formatDate(
  dateString: string,
  withYear: boolean = true,
): string {
  try {
    return format(new Date(dateString), withYear ? "d MMM yyyy" : "d MMM");
  } catch {
    return dateString;
  }
}

/**
 * Safely parse a date string, returning the parsed date or fallback
 */
export function safeParseDate(
  dateString: string | undefined | null,
  fallback: Date | undefined = undefined,
): Date | undefined {
  if (
    !dateString ||
    typeof dateString !== "string" ||
    dateString.trim() === ""
  ) {
    return fallback;
  }
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? fallback : parsed;
}

/**
 * Returns true if currentDate is the next UTC day after previousDate.
 * Expects dates in YYYY-MM-DD format.
 */
export function isNextDay(previousDate: string, currentDate: string): boolean {
  const next = addDays(parseISO(previousDate), 1);
  const curr = parseISO(currentDate);
  return isSameDay(next, curr);
}

/**
 * Formats a Date object as a string in YYYY-MM-DD (UTC) format.
 * Uses the ISO string to ensure UTC-based date (same as `date.toISOString().slice(0,10)`).
 */
export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
