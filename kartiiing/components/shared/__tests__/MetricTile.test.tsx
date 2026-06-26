import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MetricTile from "../MetricTile";

describe("MetricTile", () => {
  it("renders icon, value, and title", () => {
    render(
      <MetricTile icon={<span>🌧</span>} value="12 mm" title="Precipitation" />,
    );

    expect(screen.getByText("12 mm")).toBeInTheDocument();
    expect(screen.getByTitle("Precipitation")).toBeInTheDocument();
  });

  it("returns null when show is false", () => {
    const { container } = render(
      <MetricTile icon="x" value="x" show={false} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders by default when show is not specified", () => {
    render(<MetricTile icon="x" value="visible" />);

    expect(screen.getByText("visible")).toBeInTheDocument();
  });

  it("applies additional className", () => {
    const { container } = render(
      <MetricTile icon="x" value="x" className="tracking-wide" />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
