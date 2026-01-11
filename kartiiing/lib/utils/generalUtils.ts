import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a lap time given in milliseconds to a string in the format "M:SS.sss" or "SS.sss".
 * @param milliseconds - The lap time in milliseconds.
 * @returns The formatted lap time as a string.
 */
export function formatLapTime(milliseconds: number): string {
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const secs = (totalSeconds % 60).toFixed(3);
  return `${minutes === 0 ? "" : `${minutes}:`}${secs.padStart(6, "0")}`;
}

/**
 * Opens a given URL in a new browser tab with security features.
 * @param url - The URL to be opened in a new tab.
 */
export function openLinkInNewTab(url: string) {
  window.open(url, "_blank", "noopener noreferrer");
}

/**
 * Generate a URL-friendly slug from a string
 * @param text - The input string to be converted into a slug.
 * @returns A URL-friendly slug string.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD") // Normalize accented characters
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
