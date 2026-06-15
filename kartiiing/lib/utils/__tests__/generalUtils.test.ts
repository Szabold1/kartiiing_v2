import { describe, expect, it, vi } from "vitest";
import {
  formatLapTime,
  getGoogleMapsUrl,
  openLinkInNewTab,
} from "../generalUtils";

describe("generalUtils", () => {
  describe("formatLapTime", () => {
    it("formats zero milliseconds", () => {
      expect(formatLapTime(0)).toBe("00.000");
    });

    it("formats sub-second time correctly", () => {
      expect(formatLapTime(500)).toBe("00.500");
    });

    it("formats sub-minute time", () => {
      expect(formatLapTime(54321)).toBe("54.321");
    });

    it("formats time over 60 seconds with minutes", () => {
      expect(formatLapTime(74500)).toBe("1:14.500");
    });

    it("formats exact minute boundary", () => {
      expect(formatLapTime(60000)).toBe("1:00.000");
    });
  });

  describe("getGoogleMapsUrl", () => {
    it("returns a Google Maps URL for valid coordinates", () => {
      const url = getGoogleMapsUrl({ latitude: 47.9495, longitude: 21.7444 });
      expect(url).toBe("https://maps.google.com/?q=47.9495,21.7444");
    });

    it("returns null when latitude is 0", () => {
      const url = getGoogleMapsUrl({ latitude: 0, longitude: 21.7444 });
      expect(url).toBeNull();
    });

    it("returns null when longitude is 0", () => {
      const url = getGoogleMapsUrl({ latitude: 47.9495, longitude: 0 });
      expect(url).toBeNull();
    });
  });

  describe("openLinkInNewTab", () => {
    it("calls window.open with _blank and security features", () => {
      const openSpy = vi.spyOn(window, "open").mockReturnValue(null);
      openLinkInNewTab("https://example.com");

      expect(openSpy).toHaveBeenCalledWith(
        "https://example.com",
        "_blank",
        "noopener noreferrer",
      );
      openSpy.mockRestore();
    });
  });
});
