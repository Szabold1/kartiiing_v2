import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CalendarViewMode } from "@/lib/constants/calendar";
import GridListViewToggle from "../GridListViewToggle";

const mockSetViewMode = vi.fn();

vi.mock("@/lib/stores/calendarStore", () => ({
  useCalendarStore: vi.fn(() => ({
    viewMode: CalendarViewMode.GRID,
    setViewMode: mockSetViewMode,
  })),
}));

describe("GridListViewToggle", () => {
  beforeEach(() => {
    mockSetViewMode.mockClear();
  });

  it("renders grid and list toggle buttons", () => {
    render(<GridListViewToggle />);

    expect(
      screen.getByRole("button", { name: "Grid view" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "List view" }),
    ).toBeInTheDocument();
  });

  it("calls setViewMode with LIST when list button is clicked", async () => {
    const user = userEvent.setup();
    render(<GridListViewToggle />);

    await user.click(screen.getByRole("button", { name: "List view" }));

    expect(mockSetViewMode).toHaveBeenCalledWith(CalendarViewMode.LIST);
  });

  it("calls setViewMode with GRID when grid button is clicked", async () => {
    const user = userEvent.setup();
    render(<GridListViewToggle />);

    await user.click(screen.getByRole("button", { name: "Grid view" }));

    expect(mockSetViewMode).toHaveBeenCalledWith(CalendarViewMode.GRID);
  });

  it("applies additional className", () => {
    const { container } = render(
      <GridListViewToggle className="tracking-wide" />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
