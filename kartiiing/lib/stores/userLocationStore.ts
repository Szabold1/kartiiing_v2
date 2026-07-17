import { create } from 'zustand';
import { ICoordinates } from '@kartiiing/shared';
import {
  getLocationFromGPS,
  getLocationFromIP,
} from '@/lib/utils/locationUtils';

type UserLocationStore = {
  /** Resolved coordinates, or null before initialization / if unavailable */
  userLocation: ICoordinates | null;
  /** Human-readable location name from IP geolocation (e.g. "Paris, France") */
  locationName: string | undefined;
  /** Source of the resolved location (gps or ip), undefined if not resolved */
  locationSource: 'gps' | 'ip' | undefined;
  /** True when both GPS and IP geolocation failed */
  locationUnavailable: boolean;
  /** Call once on mount to resolve the user's location. Idempotent. */
  initialize: () => Promise<void>;
};

export const useUserLocationStore = create<UserLocationStore>((set, get) => ({
  userLocation: null,
  locationName: undefined,
  locationSource: undefined,
  locationUnavailable: false,

  initialize: async () => {
    // Skip if already resolved or already known to be unavailable
    if (get().userLocation !== null || get().locationUnavailable) return;

    // Try GPS first, fall back to IP
    const gps = await getLocationFromGPS();
    if (gps) {
      set({
        userLocation: {
          latitude: gps.latitude,
          longitude: gps.longitude,
        },
        locationSource: 'gps',
      });
      return;
    }

    const ip = await getLocationFromIP();
    if (ip) {
      set({
        userLocation: {
          latitude: ip.latitude,
          longitude: ip.longitude,
        },
        locationName: ip.locationName,
        locationSource: 'ip',
      });
      return;
    }

    set({ locationUnavailable: true });
  },
}));
