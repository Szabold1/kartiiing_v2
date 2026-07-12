import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { buildCircuitDetail } from "@/test/fixtures";
import { CircuitInfoContent } from "../CircuitInfoContent";

vi.mock("@/lib/stores/userLocationStore", () => ({
  useUserLocationStore: vi.fn(),
}));

import { useUserLocationStore } from "@/lib/stores/userLocationStore";

const VISIT_LINK_LABEL = "Visit circuit website";
const MAPS_LINK_LABEL = "Open in Google Maps";

describe("CircuitInfoContent", () => {
  beforeEach(() => {
    vi.mocked(useUserLocationStore).mockImplementation((selector: unknown) => {
      if (typeof selector === "function") {
        return selector({ locationName: undefined });
      }
      return undefined;
    });
  });

  const circuit = buildCircuitDetail({
    name: "Test Circuit",
    length: 1200,
    layouts: [{ id: 1, name: "Layout A", length: 1200 }],
  });

  it("renders circuit name", () => {
    render(<CircuitInfoContent circuit={circuit} />);

    expect(screen.getByText("Test Circuit")).toBeInTheDocument();
  });

  it("renders circuit length", () => {
    render(<CircuitInfoContent circuit={circuit} />);

    expect(screen.getByText("1200 m")).toBeInTheDocument();
  });

  it("renders location name via RaceLocation", () => {
    render(<CircuitInfoContent circuit={circuit} />);

    expect(screen.getByText(circuit.locationName)).toBeInTheDocument();
  });

  it("renders website link when circuit.website exists", () => {
    const circuitWithSite = buildCircuitDetail({
      website: "https://circuit.com",
    });
    render(<CircuitInfoContent circuit={circuitWithSite} />);

    const link = screen.getByRole("link", { name: VISIT_LINK_LABEL });
    expect(link).toHaveAttribute("href", "https://circuit.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render website link when website is missing", () => {
    render(<CircuitInfoContent circuit={circuit} />);

    expect(
      screen.queryByRole("link", { name: VISIT_LINK_LABEL }),
    ).not.toBeInTheDocument();
  });

  it("renders Google Maps link when coordinates are valid", () => {
    render(<CircuitInfoContent circuit={circuit} />);

    const link = screen.getByRole("link", { name: MAPS_LINK_LABEL });
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders distance instead of length when circuit.distance is available", () => {
    const withDistance = buildCircuitDetail({
      length: 1200,
      distance: 5.3,
    });
    render(<CircuitInfoContent circuit={withDistance} />);

    expect(screen.getByText("5 km")).toBeInTheDocument();
    expect(screen.queryByText("1200 m")).not.toBeInTheDocument();
  });

  it("renders length when circuit.distance is null", () => {
    render(<CircuitInfoContent circuit={circuit} />);

    expect(screen.getByText("1200 m")).toBeInTheDocument();
  });

  it("does not render a metric when circuit length is 0", () => {
    const zeroLength = buildCircuitDetail({ length: 0, layouts: [] });
    render(<CircuitInfoContent circuit={zeroLength} />);

    expect(screen.queryByText(/\d+ m/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\d+ km/)).not.toBeInTheDocument();
  });
});
