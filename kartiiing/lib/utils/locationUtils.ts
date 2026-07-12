import { type Map as MapboxMap } from "mapbox-gl";
import { ICoordinates } from "@kartiiing/shared";

export interface UserLocation {
  longitude: number;
  latitude: number;
  source: "gps" | "ip";
  locationName?: string;
}

/**
 * Attempts to get the user's location via the browser Geolocation API.
 * Returns GPS-accurate coordinates or null if unavailable/denied.
 */
export async function getLocationFromGPS(): Promise<UserLocation | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) return null;

  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 1000 * 60 * 60, // 1 hour
        });
      },
    );
    return {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      source: "gps",
    };
  } catch {
    return null;
  }
}

/**
 * Fetches the user's approximate location via IP geolocation.
 * No permission prompt needed — resolves fast.
 *
 * **Dependency:** Uses the free third-party service `freeipapi.com`.
 * User IPs are sent to this service. If the service is unavailable, rate-limited,
 * or changes its free tier, this function silently returns `null`.
 * No fallback is implemented — callers should handle the `null` case gracefully.
 */
export async function getLocationFromIP(): Promise<UserLocation | null> {
  try {
    const url = "https://free.freeipapi.com/api/json";
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(
        `IP geolocation failed: ${url} returned status ${res.status}`,
      );
      return null;
    }
    const data = await res.json();
    if (data.latitude != null && data.longitude != null) {
      const locationName =
        data.cityName && data.countryName
          ? `${data.cityName}, ${data.countryName}`
          : data.countryName || undefined;
      return {
        longitude: data.longitude,
        latitude: data.latitude,
        source: "ip",
        locationName,
      };
    }
    console.warn("IP geolocation failed: response lacked coordinates", data);
    return null;
  } catch (err) {
    console.warn("IP geolocation failed with error:", err);
    return null;
  }
}

/**
 * Flies the map to a given center coordinate at the specified zoom level.
 */
export function flyToCenter(
  map: MapboxMap,
  center: ICoordinates | null,
  zoom: number,
): void {
  if (!center) return;
  map.flyTo({
    center: [center.longitude, center.latitude],
    zoom,
    duration: 1500,
    essential: true,
  });
}

/**
 * Calculates the great-circle distance (Haversine formula) between two coordinates.
 * Returns the distance in kilometers.
 */
export function calculateDistance(
  from: ICoordinates,
  to: ICoordinates,
): number {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(to.latitude - from.latitude);
  const dLng = toRad(to.longitude - from.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.latitude)) *
      Math.cos(toRad(to.latitude)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
