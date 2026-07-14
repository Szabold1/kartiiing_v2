import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CalendarOrderPreset } from "@kartiiing/shared";
import { CalendarViewMode } from "@/lib/constants/calendar";
import { CalendarActions } from "../CalendarActions";

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

  it("renders SortDropdown", () => {
    render(
      <CalendarActions
        preset={CalendarOrderPreset.ALL_ASC}
        onPresetChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders GridListViewToggle in normal mode", () => {
    render(
      <CalendarActions
        preset={CalendarOrderPreset.ALL_ASC}
        onPresetChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Grid view" }),
    ).toBeInTheDocument();
  });

  it("does not render GridListViewToggle in small mode", () => {
    render(
      <CalendarActions
        preset={CalendarOrderPreset.ALL_ASC}
        onPresetChange={vi.fn()}
        small
      />,
    );

    expect(
      screen.queryByRole("button", { name: "Grid view" }),
    ).not.toBeInTheDocument();
  });
});
