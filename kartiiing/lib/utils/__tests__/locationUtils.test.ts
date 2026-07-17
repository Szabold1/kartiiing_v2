import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  getLocationFromGPS,
  getLocationFromIP,
  calculateDistance,
  flyToCenter,
} from '../locationUtils';
import type { Map as MapboxMap } from 'mapbox-gl';

const BUDAPEST_LAT = 47.4979;
const BUDAPEST_LNG = 19.0402;
const PARIS_LAT = 48.8566;
const PARIS_LNG = 2.3522;
const NEW_YORK_LAT = 40.7128;
const NEW_YORK_LNG = -74.006;
const DEFAULT_API_URL = 'https://free.freeipapi.com/api/json';

describe('getLocationFromGPS', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns coordinates with source=gps on success', async () => {
    Object.defineProperty(globalThis.navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi.fn().mockImplementation((success) =>
          success({
            coords: { latitude: BUDAPEST_LAT, longitude: BUDAPEST_LNG },
          }),
        ),
      },
      configurable: true,
    });

    const result = await getLocationFromGPS();

    expect(result).toEqual({
      latitude: BUDAPEST_LAT,
      longitude: BUDAPEST_LNG,
      source: 'gps',
    });
  });

  it('returns null when geolocation is unavailable', async () => {
    Object.defineProperty(globalThis.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    const result = await getLocationFromGPS();

    expect(result).toBeNull();
  });

  it('returns null when permission is denied', async () => {
    Object.defineProperty(globalThis.navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi
          .fn()
          .mockImplementation((_success, error) =>
            error(new Error('Permission denied')),
          ),
      },
      configurable: true,
    });

    const result = await getLocationFromGPS();

    expect(result).toBeNull();
  });

  it('handles navigator being undefined gracefully (SSR)', async () => {
    const originalNavigator = globalThis.navigator;
    Object.defineProperty(globalThis, 'navigator', {
      value: undefined,
      configurable: true,
    });

    const result = await getLocationFromGPS();

    expect(result).toBeNull();

    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
  });
});

describe('getLocationFromIP', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('returns coordinates with source=ip on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ latitude: BUDAPEST_LAT, longitude: BUDAPEST_LNG }),
    } as Response);

    const result = await getLocationFromIP();

    expect(result).toEqual({
      latitude: BUDAPEST_LAT,
      longitude: BUDAPEST_LNG,
      source: 'ip',
    });
  });

  it('calls the default API URL', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ latitude: BUDAPEST_LAT, longitude: BUDAPEST_LNG }),
    } as Response);

    await getLocationFromIP();

    expect(fetchSpy).toHaveBeenCalledWith(DEFAULT_API_URL);
  });

  it('returns null and logs warning when the response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 429,
    } as Response);

    const result = await getLocationFromIP();

    expect(result).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(
      `IP geolocation failed: ${DEFAULT_API_URL} returned status 429`,
    );
  });

  it('returns null and logs warning when the response lacks coordinates', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ latitude: BUDAPEST_LAT }),
    } as Response);

    const result = await getLocationFromIP();

    expect(result).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(
      'IP geolocation failed: response lacked coordinates',
      { latitude: BUDAPEST_LAT },
    );
  });

  it('returns null and logs warning when fetch throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(error);

    const result = await getLocationFromIP();

    expect(result).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(
      'IP geolocation failed with error:',
      error,
    );
  });
});

describe('calculateDistance', () => {
  const BUDAPEST = { latitude: BUDAPEST_LAT, longitude: BUDAPEST_LNG };
  const PARIS = { latitude: PARIS_LAT, longitude: PARIS_LNG };
  const NEW_YORK = { latitude: NEW_YORK_LAT, longitude: NEW_YORK_LNG };

  it('returns approximately 1,244 km between Budapest and Paris', () => {
    const distance = calculateDistance(BUDAPEST, PARIS);

    // Haversine distance: ~1,244 km (exact value varies slightly by formula)
    expect(distance).toBeGreaterThan(1240);
    expect(distance).toBeLessThan(1250);
  });

  it('returns 0 for the same point', () => {
    const distance = calculateDistance(PARIS, PARIS);

    expect(distance).toBe(0);
  });

  it('calculates known distance between Paris and New York', () => {
    const distance = calculateDistance(PARIS, NEW_YORK);

    // Approximately 5,830 km
    expect(distance).toBeGreaterThan(5800);
    expect(distance).toBeLessThan(5900);
  });
});

describe('flyToCenter', () => {
  const CENTER = { latitude: PARIS_LAT, longitude: PARIS_LNG };

  it('calls flyTo with correct center and zoom', () => {
    const mockFlyTo = vi.fn();
    const mockMap = {
      flyTo: mockFlyTo,
    } as unknown as MapboxMap;

    flyToCenter(mockMap, CENTER, 10);

    expect(mockFlyTo).toHaveBeenCalledWith({
      center: [CENTER.longitude, CENTER.latitude],
      zoom: 10,
      duration: 1500,
      essential: true,
    });
  });

  it('does not call flyTo when center is null', () => {
    const mockFlyTo = vi.fn();
    const mockMap = {
      flyTo: mockFlyTo,
    } as unknown as MapboxMap;

    flyToCenter(mockMap, null, 10);

    expect(mockFlyTo).not.toHaveBeenCalled();
  });
});
