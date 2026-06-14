import { describe, expect, it } from "vitest";
import { getRaceUrl, getFastestLap } from "../raceUtils";
import type { IFastestLap } from "@kartiiing/shared";

describe("raceUtils", () => {
  describe("getRaceUrl", () => {
    it("generates correct URL from race slug and id", () => {
      expect(
        getRaceUrl({
          slug: "italian-gp-2025",
          id: 42,
          date: { start: "2025-01-01", end: "2025-01-01", year: 2025 },
          updatedAt: "2025-01-01T00:00:00Z",
        }),
      ).toBe("/race/italian-gp-2025/42");
    });
  });

  describe("getFastestLap", () => {
    const laps: IFastestLap[] = [
      {
        category: "KZ2",
        engineType: "KZ",
        driverName: "A",
        lapTime: 54000,
        sessionType: "Final",
        date: "2025-01-01",
        driverCountry: { id: 1, code: "HU", name: "Hungary" },
      },
      {
        category: "OK",
        engineType: "OK",
        driverName: "B",
        lapTime: 50000,
        sessionType: "Final",
        date: "2025-01-01",
        driverCountry: { id: 1, code: "HU", name: "Hungary" },
      },
      {
        category: "Mini",
        engineType: "MINI 60",
        driverName: "C",
        lapTime: 62000,
        sessionType: "Final",
        date: "2025-01-01",
        driverCountry: { id: 1, code: "HU", name: "Hungary" },
      },
    ];

    it("returns null for an empty array", () => {
      expect(getFastestLap([])).toBeNull();
    });

    it("returns the single lap when there is only one", () => {
      expect(getFastestLap([laps[0]])).toEqual(laps[0]);
    });

    it("returns the lap with the smallest lapTime", () => {
      expect(getFastestLap(laps)).toEqual(laps[1]); // lapTime 50000
    });
  });
});
