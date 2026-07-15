import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { CircuitMetric } from "../CircuitMetric";

vi.mock("@/lib/stores/userLocationStore", () => ({
  useUserLocationStore: vi.fn(),
}));

import { useUserLocationStore } from "@/lib/stores/userLocationStore";

const TWO_LAYOUTS = [
  { id: 1, name: "Short", length: 855 },
  { id: 2, name: "Full", length: 1200 },
];

const SAME_LENGTH_LAYOUTS = [
  { id: 1, name: "Layout A", length: 1000 },
  { id: 2, name: "Layout B", length: 1000 },
];

const ONE_LAYOUT = [{ id: 1, name: "Full Circuit", length: 1122 }];

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

  it("renders a range when layouts have multiple distinct lengths", () => {
    render(<CircuitMetric value={1200} type="length" layouts={TWO_LAYOUTS} />);

    expect(screen.getByText("855 - 1200 m")).toBeInTheDocument();
  });

  it("renders a single value when layouts have the same length", () => {
    render(
      <CircuitMetric
        value={1000}
        type="length"
        layouts={SAME_LENGTH_LAYOUTS}
      />,
    );

    expect(screen.getByText("1000 m")).toBeInTheDocument();
  });

  it("renders a single value when there is only one layout", () => {
    render(<CircuitMetric value={1122} type="length" layouts={ONE_LAYOUT} />);

    expect(screen.getByText("1122 m")).toBeInTheDocument();
  });

  it("renders a single value when layouts is an empty array", () => {
    render(<CircuitMetric value={1070} type="length" layouts={[]} />);

    expect(screen.getByText("1070 m")).toBeInTheDocument();
  });

  it("renders distance normally even when layouts are provided", () => {
    render(<CircuitMetric value={5} type="distance" layouts={TWO_LAYOUTS} />);

    expect(screen.getByText("5 km")).toBeInTheDocument();
    expect(screen.queryByText(/855 - 1200 m/)).not.toBeInTheDocument();
  });
});
