import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";

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
