import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LapTime } from "../LapTime";

describe("LapTime", () => {
  it("renders formatted lap time as monospace", () => {
    render(<LapTime time={54321} />);

    expect(screen.getByText("54.321")).toBeInTheDocument();
    expect(screen.getByText("54.321")).toHaveClass(
      "font-mono",
      "font-semibold",
    );
  });

  it("formats sub-minute times without leading minutes", () => {
    render(<LapTime time={59210} />);

    expect(screen.getByText("59.210")).toBeInTheDocument();
  });

  it("formats times over 60 seconds with minutes", () => {
    render(<LapTime time={74500} />);

    expect(screen.getByText("1:14.500")).toBeInTheDocument();
  });

  it("formats zero correctly", () => {
    render(<LapTime time={0} />);

    expect(screen.getByText("00.000")).toBeInTheDocument();
  });

  it("applies additional className", () => {
    render(<LapTime time={5000} className="tracking-wide" />);

    expect(screen.getByText("05.000")).toHaveClass("tracking-wide");
  });
});
