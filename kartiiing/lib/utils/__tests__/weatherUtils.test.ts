import { describe, expect, it } from "vitest";
import { getWeatherVisual, formatValue } from "../weatherUtils";
import type { IWeatherCondition } from "@kartiiing/shared";

describe("weatherUtils", () => {
  describe("getWeatherVisual", () => {
    it("returns Cloud icon for undefined condition", () => {
      const result = getWeatherVisual(undefined);
      expect(result.icon).toBeDefined();
      expect(result.className).toContain("slate");
    });

    it("returns correct visual for clear-day icon", () => {
      const result = getWeatherVisual({
        name: "Sunny",
        icon: "clear-day",
      } satisfies IWeatherCondition);
      expect(result.className).toContain("amber");
    });

    it("returns correct visual for rain icon", () => {
      const result = getWeatherVisual({
        name: "Rain",
        icon: "rain",
      } satisfies IWeatherCondition);
      expect(result.className).toContain("blue");
    });

    it("infers rain from condition name when icon is missing", () => {
      const result = getWeatherVisual({
        name: "Showers",
      } satisfies IWeatherCondition);
      expect(result.className).toContain("blue");
    });

    it("infers snow from condition name containing 'sleet'", () => {
      const result = getWeatherVisual({
        name: "Sleet",
      } satisfies IWeatherCondition);
      expect(result.className).toContain("sky");
    });

    it("falls back to Cloud for unknown condition name", () => {
      const result = getWeatherVisual({
        name: "UnknownWeatherType",
      } satisfies IWeatherCondition);
      expect(result.className).toContain("slate");
    });
  });

  describe("formatValue", () => {
    it("returns '-' for undefined", () => {
      expect(formatValue(undefined)).toBe("-");
    });

    it("returns '-' for NaN", () => {
      expect(formatValue(NaN)).toBe("-");
    });

    it("formats integer value without unit", () => {
      expect(formatValue(20)).toBe("20");
    });

    it("formats decimal value rounded to integer", () => {
      expect(formatValue(18.3)).toBe("18");
    });

    it("formats value with unit", () => {
      expect(formatValue(20, "℃")).toBe("20 ℃");
    });

    it("formats value with 'km/h' unit", () => {
      expect(formatValue(10, "km/h")).toBe("10 km/h");
    });
  });
});