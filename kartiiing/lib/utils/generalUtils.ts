import { ICoordinates } from "@kartiiing/shared";
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
 * Generate a Google Maps URL for given coordinates
 * @param coordinates
 * @return Google Maps URL string or null if coordinates are invalid
 */
export function getGoogleMapsUrl(coordinates: ICoordinates) {
  const { latitude, longitude } = coordinates;
  if (!latitude || !longitude) return null;
  return `https://maps.google.com/?q=${latitude},${longitude}`;
}
