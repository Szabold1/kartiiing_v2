import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildCircuitDetail } from "@/test/fixtures";
import CircuitInfoContent from "../CircuitInfoContent";

describe("CircuitInfoContent", () => {
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

    expect(screen.getByText(/1200 meters/)).toBeInTheDocument();
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

    const link = screen.getByTitle("Visit circuit website");
    expect(link).toHaveAttribute("href", "https://circuit.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render website link when website is missing", () => {
    render(<CircuitInfoContent circuit={circuit} />);

    expect(
      screen.queryByTitle("Visit circuit website"),
    ).not.toBeInTheDocument();
  });

  it("renders Google Maps link when coordinates are valid", () => {
    render(<CircuitInfoContent circuit={circuit} />);

    const link = screen.getByTitle("Open in Google Maps");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders 'Unknown length' when circuit length is 0 and no layouts exist", () => {
    const zeroLength = buildCircuitDetail({ length: 0, layouts: [] });
    render(<CircuitInfoContent circuit={zeroLength} />);

    expect(screen.getByText(/Unknown length/)).toBeInTheDocument();
  });
});
