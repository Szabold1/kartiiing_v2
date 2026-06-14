import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { buildFastestLap } from "@/test/fixtures";
import FastestLapsList from "../FastestLapsList";

const laps = [
  buildFastestLap({
    category: "KZ2",
    engineType: "KZ",
    lapTime: 54000,
    date: "2025-06-04",
  }),
  buildFastestLap({
    category: "OK",
    engineType: "OK",
    lapTime: 50000,
    date: "2025-06-04",
  }),
  buildFastestLap({
    category: "Mini",
    engineType: "MINI 60",
    lapTime: 62000,
    date: "2025-06-04",
  }),
];

describe("FastestLapsList", () => {
  it("returns null when laps array is empty", () => {
    const { container } = render(<FastestLapsList fastestLaps={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders all lap categories", () => {
    render(<FastestLapsList fastestLaps={laps} />);

    expect(screen.getByText("KZ2")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
    expect(screen.getByText("Mini")).toBeInTheDocument();
  });

  it("pre-expands the fastest lap by default", () => {
    render(<FastestLapsList fastestLaps={laps} />);

    // The fastest lap is OK with lapTime 50000 - it should be expanded
    const buttons = screen.getAllByRole("button");
    const fastestButton = buttons.find((btn) =>
      btn.getAttribute("aria-label")?.includes("OK"),
    )!;
    expect(fastestButton).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles expansion when clicked", async () => {
    const user = userEvent.setup();
    render(<FastestLapsList fastestLaps={laps} />);

    const buttons = screen.getAllByRole("button");
    const kz2Button = buttons.find((btn) =>
      btn.getAttribute("aria-label")?.includes("KZ2"),
    )!;

    // Initially collapsed (KZ2 is not fastest)
    expect(kz2Button).toHaveAttribute("aria-expanded", "false");

    await user.click(kz2Button);
    expect(kz2Button).toHaveAttribute("aria-expanded", "true");

    await user.click(kz2Button);
    expect(kz2Button).toHaveAttribute("aria-expanded", "false");
  });

  it("applies additional className", () => {
    const { container } = render(
      <FastestLapsList fastestLaps={laps} className="tracking-wide" />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
