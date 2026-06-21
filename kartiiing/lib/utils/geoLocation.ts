/**
 * Fetches the user's approximate location by calling a geo-IP API.
 * The API URL is configurable via NEXT_PUBLIC_GEOIP_API_URL.
 *
 * @returns { longitude, latitude } or null if the lookup fails.
 */
export async function fetchUserLocation(): Promise<{
  longitude: number;
  latitude: number;
} | null> {
  try {
    const url =
      process.env.NEXT_PUBLIC_GEOIP_API_URL ||
      "https://free.freeipapi.com/api/json";
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.latitude && data.longitude) {
      return {
        longitude: data.longitude,
        latitude: data.latitude,
      };
    }
    return null;
  } catch {
    console.error("Failed to fetch user location");
    return null;
  }
}
