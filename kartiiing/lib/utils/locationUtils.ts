export interface UserLocation {
  longitude: number;
  latitude: number;
  source: "gps" | "ip";
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
 */
export async function getLocationFromIP(): Promise<UserLocation | null> {
  try {
    const url = "https://free.freeipapi.com/api/json";
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.latitude != null && data.longitude != null) {
      return {
        longitude: data.longitude,
        latitude: data.latitude,
        source: "ip",
      };
    }
    return null;
  } catch {
    return null;
  }
}
