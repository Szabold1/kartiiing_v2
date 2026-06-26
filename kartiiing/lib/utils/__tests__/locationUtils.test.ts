import { describe, expect, it, vi, beforeEach } from "vitest";
import { getLocationFromGPS, getLocationFromIP } from "../locationUtils";

const BUDAPEST_LAT = 47.4979;
const BUDAPEST_LNG = 19.0402;
const DEFAULT_API_URL = "https://free.freeipapi.com/api/json";

describe("getLocationFromGPS", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns coordinates with source=gps on success", async () => {
    Object.defineProperty(globalThis.navigator, "geolocation", {
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
      source: "gps",
    });
  });

  it("returns null when geolocation is unavailable", async () => {
    Object.defineProperty(globalThis.navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });

    const result = await getLocationFromGPS();

    expect(result).toBeNull();
  });

  it("returns null when permission is denied", async () => {
    Object.defineProperty(globalThis.navigator, "geolocation", {
      value: {
        getCurrentPosition: vi
          .fn()
          .mockImplementation((_success, error) =>
            error(new Error("Permission denied")),
          ),
      },
      configurable: true,
    });

    const result = await getLocationFromGPS();

    expect(result).toBeNull();
  });

  it("handles navigator being undefined gracefully (SSR)", async () => {
    const originalNavigator = globalThis.navigator;
    Object.defineProperty(globalThis, "navigator", {
      value: undefined,
      configurable: true,
    });

    const result = await getLocationFromGPS();

    expect(result).toBeNull();

    Object.defineProperty(globalThis, "navigator", {
      value: originalNavigator,
      configurable: true,
    });
  });
});

describe("getLocationFromIP", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns coordinates with source=ip on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ latitude: BUDAPEST_LAT, longitude: BUDAPEST_LNG }),
    } as Response);

    const result = await getLocationFromIP();

    expect(result).toEqual({
      latitude: BUDAPEST_LAT,
      longitude: BUDAPEST_LNG,
      source: "ip",
    });
  });

  it("calls the default API URL", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ latitude: BUDAPEST_LAT, longitude: BUDAPEST_LNG }),
    } as Response);

    await getLocationFromIP();

    expect(fetchSpy).toHaveBeenCalledWith(DEFAULT_API_URL);
  });

  it("returns null when the response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false } as Response);

    const result = await getLocationFromIP();

    expect(result).toBeNull();
  });

  it("returns null when the response lacks coordinates", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ latitude: BUDAPEST_LAT }),
    } as Response);

    const result = await getLocationFromIP();

    expect(result).toBeNull();
  });

  it("returns null when fetch throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    const result = await getLocationFromIP();

    expect(result).toBeNull();
  });
});
