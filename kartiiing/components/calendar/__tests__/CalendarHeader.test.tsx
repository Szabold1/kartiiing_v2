import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CalendarHeader } from "../CalendarHeader";

const mockRouterPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe("CalendarHeader", () => {
  const years = [2024, 2025, "all"];

  it("renders the Calendar title and description", () => {
    render(
      <CalendarHeader
        description="2025 season"
        selectedYear={2025}
        years={years}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Calendar" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2025 season")).toBeInTheDocument();
  });

  it("formats 'all' as 'All Years' in the select", () => {
    render(<CalendarHeader description="" selectedYear="all" years={years} />);

    expect(
      screen.getByRole("combobox", { name: /select year/i }),
    ).toBeInTheDocument();
  });

  it("renders a select with the given years", () => {
    render(<CalendarHeader description="" selectedYear={2025} years={years} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
