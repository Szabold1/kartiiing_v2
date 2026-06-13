import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RaceEventSortOptions, RaceStatus } from "@kartiiing/shared";
import { buildRace } from "@/test/fixtures";
import { CalendarViewMode } from "@/lib/constants/calendar";
import CalendarActions from "../CalendarActions";

const mockSetViewMode = vi.fn();

vi.mock("@/lib/stores/calendarStore", () => ({
  useCalendarStore: vi.fn(() => ({
    viewMode: CalendarViewMode.GRID,
    setViewMode: mockSetViewMode,
  })),
}));

describe("CalendarActions", () => {
  beforeEach(() => {
    mockSetViewMode.mockClear();
  });

  it("renders sort toggle always", () => {
    render(
      <CalendarActions
        sortOrder={RaceEventSortOptions.ASC}
        onSortChange={vi.fn()}
        races={[buildRace()]}
      />,
    );

    expect(
      screen.getByRole("button", { name: /ascending/i }),
    ).toBeInTheDocument();
  });

  it("renders NextRaceBtn when live or upcoming races exist", () => {
    const races = [buildRace({ status: RaceStatus.LIVE })];
    render(
      <CalendarActions
        sortOrder={RaceEventSortOptions.ASC}
        onSortChange={vi.fn()}
        races={races}
      />,
    );

    expect(
      screen.getByRole("button", { name: /race now/i }),
    ).toBeInTheDocument();
  });

  it("does not render NextRaceBtn when no live or upcoming races", () => {
    render(
      <CalendarActions
        sortOrder={RaceEventSortOptions.ASC}
        onSortChange={vi.fn()}
        races={[buildRace()]}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /next race|race now/i }),
    ).not.toBeInTheDocument();
  });

  it("renders GridListViewToggle in normal mode", () => {
    render(
      <CalendarActions
        sortOrder={RaceEventSortOptions.ASC}
        onSortChange={vi.fn()}
        races={[buildRace()]}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Grid view" }),
    ).toBeInTheDocument();
  });

  it("does not render GridListViewToggle in small mode", () => {
    render(
      <CalendarActions
        sortOrder={RaceEventSortOptions.ASC}
        onSortChange={vi.fn()}
        races={[buildRace()]}
        small
      />,
    );

    expect(
      screen.queryByRole("button", { name: "Grid view" }),
    ).not.toBeInTheDocument();
  });
});
