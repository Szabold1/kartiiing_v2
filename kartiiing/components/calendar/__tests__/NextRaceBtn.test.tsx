import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RaceStatus } from "@kartiiing/shared";
import { buildRace } from "@/test/fixtures";
import NextRaceBtn from "../NextRaceBtn";

describe("NextRaceBtn", () => {
  it("renders 'Next race' when no live or upcoming races", () => {
    const races = [buildRace()];
    render(<NextRaceBtn races={races} />);

    expect(
      screen.getByRole("button", { name: /next race/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Race now' when there is one live race", () => {
    const races = [buildRace({ status: RaceStatus.LIVE })];
    render(<NextRaceBtn races={races} />);

    expect(
      screen.getByRole("button", { name: /race now/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Races now' when there are multiple live races", () => {
    const races = [
      buildRace({ id: 1, status: RaceStatus.LIVE }),
      buildRace({ id: 2, status: RaceStatus.LIVE }),
    ];
    render(<NextRaceBtn races={races} />);

    expect(
      screen.getByRole("button", { name: /races now/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Next races' when there are multiple upcoming races", () => {
    const races = [
      buildRace({ id: 1, status: RaceStatus.UPNEXT }),
      buildRace({ id: 2, status: RaceStatus.UPNEXT }),
    ];
    render(<NextRaceBtn races={races} />);

    expect(
      screen.getByRole("button", { name: /next races/i }),
    ).toBeInTheDocument();
  });

  it("prioritizes live over upcoming in label", () => {
    const races = [
      buildRace({ id: 1, status: RaceStatus.LIVE }),
      buildRace({ id: 2, status: RaceStatus.UPNEXT }),
    ];
    render(<NextRaceBtn races={races} />);

    expect(
      screen.getByRole("button", { name: /race now/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /next race/i }),
    ).not.toBeInTheDocument();
  });

  it("calls scrollIntoView on the target race element", async () => {
    const user = userEvent.setup();
    const race = buildRace({ id: 42, status: RaceStatus.LIVE });

    const scrollIntoView = vi.fn();
    document.getElementById = vi.fn().mockReturnValue({
      scrollIntoView,
    });

    render(<NextRaceBtn races={[race]} />);
    await user.click(screen.getByRole("button"));

    expect(document.getElementById).toHaveBeenCalledWith("42");
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
  });
});
