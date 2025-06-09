import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
