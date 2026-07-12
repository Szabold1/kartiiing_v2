import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { CircuitMetric } from "../CircuitMetricBadge";

vi.mock("@/lib/stores/userLocationStore", () => ({
  useUserLocationStore: vi.fn(),
}));

import { useUserLocationStore } from "@/lib/stores/userLocationStore";

describe("CircuitMetric", () => {
  beforeEach(() => {
    vi.mocked(useUserLocationStore).mockImplementation((selector: unknown) => {
      if (typeof selector === "function") {
        return selector({ locationName: undefined });
      }
      return undefined;
    });
  });

  it("renders a length metric with the value in meters", () => {
    render(<CircuitMetric value={1070} type="length" />);

    expect(screen.getByText("1070 m")).toBeInTheDocument();
  });

  it("renders a distance metric with the value in kilometers", () => {
    render(<CircuitMetric value={5.3} type="distance" />);

    expect(screen.getByText("5 km")).toBeInTheDocument();
  });

  it("does not render when value is 0", () => {
    const { container } = render(<CircuitMetric value={0} type="length" />);

    expect(container.firstChild).toBeNull();
  });

  it("does not render when value is negative", () => {
    const { container } = render(<CircuitMetric value={-1} type="length" />);

    expect(container.firstChild).toBeNull();
  });

  it("adds a title attribute on distance metrics for the tooltip", () => {
    render(<CircuitMetric value={5} type="distance" />);

    expect(
      screen.getByTitle(
        "Approximate straight-line distance from your location",
      ),
    ).toBeInTheDocument();
  });

  it("includes location name in distance tooltip when IP location is known", () => {
    vi.mocked(useUserLocationStore).mockImplementation((selector: unknown) => {
      if (typeof selector === "function") {
        return selector({ locationName: "Budapest, Hungary" });
      }
      return undefined;
    });

    render(<CircuitMetric value={5} type="distance" />);

    expect(
      screen.getByTitle(
        "Approximate straight-line distance from Budapest, Hungary",
      ),
    ).toBeInTheDocument();
  });

  it("does not add a title attribute on length metrics", () => {
    render(<CircuitMetric value={1070} type="length" />);

    // The length metric should not have a wrapping span with a title
    const elements = screen.getAllByText("1070 m");
    for (const el of elements) {
      expect(el.closest("span[title]")).toBeNull();
    }
  });
});
