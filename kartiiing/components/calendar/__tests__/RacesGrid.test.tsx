import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { buildRace } from "@/test/fixtures";
import { CalendarViewMode } from "@/lib/constants/calendar";
import RacesGrid from "../RacesGrid";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Default to grid view
vi.mock("@/lib/stores/calendarStore", () => ({
  useCalendarStore: vi.fn((selector) =>
    selector({ viewMode: CalendarViewMode.GRID, setViewMode: vi.fn() }),
  ),
}));

const RACE_2025 = buildRace({
  id: 1,
  title: "Race 2025",
  date: { start: "2025-06-01", end: "2025-06-04", year: 2025 },
});

const RACE_2024 = buildRace({
  id: 2,
  title: "Race 2024",
  date: { start: "2024-08-15", end: "2024-08-18", year: 2024 },
});

describe("RacesGrid", () => {
  it("renders a loader when loading is true", () => {
    const { container } = render(
      <RacesGrid races={[]} loading={true} sectionWidth={1000} />,
    );

    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders ErrorState when races array is empty and not loading", () => {
    render(<RacesGrid races={[]} loading={false} sectionWidth={1000} />);

    expect(screen.getByText("No races found")).toBeInTheDocument();
  });

  it("renders race cards when races are provided", () => {
    render(
      <RacesGrid races={[RACE_2025]} loading={false} sectionWidth={1000} />,
    );

    expect(screen.getByText("Race 2025")).toBeInTheDocument();
  });

  it("groups races by year and shows year headers in isAllYearsView", () => {
    render(
      <RacesGrid
        races={[RACE_2025, RACE_2024]}
        loading={false}
        sectionWidth={1000}
        isAllYearsView
      />,
    );

    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("does not show year header when there is only one year and not isAllYearsView", () => {
    render(
      <RacesGrid races={[RACE_2025]} loading={false} sectionWidth={1000} />,
    );

    expect(screen.queryByText("2025")).not.toBeInTheDocument();
  });

  it("shows year headers when multiple years are present", () => {
    render(
      <RacesGrid
        races={[RACE_2025, RACE_2024]}
        loading={false}
        sectionWidth={1000}
      />,
    );

    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });
});
