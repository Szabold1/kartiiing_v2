import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { flagIconBase } from "@/lib/utils";
import { buildCircuit, buildCircuitDetail } from "@/test/fixtures";
import RaceLocation from "../RaceLocation";

const CIRCUITS = {
  base: buildCircuit(),
  detail: buildCircuitDetail(),
} as const;

const getMapUrl = (latitude: number, longitude: number) =>
  `https://maps.google.com/?q=${latitude},${longitude}`;

describe("RaceLocation", () => {
  it("renders location name by default", () => {
    render(<RaceLocation circuit={CIRCUITS.base} />);

    expect(screen.getByText(CIRCUITS.base.locationName)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders circuit name for circuit detail when version is circuitName", () => {
    render(<RaceLocation circuit={CIRCUITS.detail} version="circuitName" />);

    expect(screen.getByText(CIRCUITS.detail.name)).toBeInTheDocument();
  });

  it("falls back to locationName for circuitName version when name is unavailable", () => {
    render(<RaceLocation circuit={CIRCUITS.base} version="circuitName" />);

    expect(screen.getByText(CIRCUITS.base.locationName)).toBeInTheDocument();
  });

  it("renders flag by default with shared flag styles", () => {
    render(<RaceLocation circuit={CIRCUITS.base} />);

    const flag = screen.getByRole("img", {
      name: `${CIRCUITS.base.country.name} flag`,
    });
    expect(flag).toHaveClass(...flagIconBase.split(" "));
  });

  it("does not render flag when showFlag is false", () => {
    render(<RaceLocation circuit={CIRCUITS.base} showFlag={false} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders clickable map link with expected attributes", () => {
    render(<RaceLocation circuit={CIRCUITS.base} isClickable />);

    const link = screen.getByRole("link", {
      name: `View ${CIRCUITS.base.locationName} on Google Maps`,
    });
    expect(link).toHaveAttribute(
      "href",
      getMapUrl(CIRCUITS.base.latitude, CIRCUITS.base.longitude),
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("cursor-pointer");
  });

  it("applies additional className", () => {
    const { container } = render(
      <RaceLocation circuit={CIRCUITS.base} className="tracking-wide" />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
