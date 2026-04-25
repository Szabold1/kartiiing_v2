import { format } from "date-fns";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildRaceEventDate } from "@/test/fixtures";
import { getRelativeText, toDay } from "@/lib/utils";
import RaceDate from "../RaceDate";

const DATES = {
  sameDay: buildRaceEventDate({ start: "2025-06-01", end: "2025-06-01" }),
  sameMonth: buildRaceEventDate({ start: "2025-06-01", end: "2025-06-04" }),
  differentMonth: buildRaceEventDate({
    start: "2025-06-30",
    end: "2025-07-02",
  }),
  noDates: buildRaceEventDate({ start: undefined, end: undefined }),
} as const;

describe("RaceDate", () => {
  it("renders Date TBA when both start and end are missing", () => {
    render(<RaceDate date={DATES.noDates} />);

    expect(screen.getByText("Date TBA")).toBeInTheDocument();
  });

  it("renders a single day when start and end are the same", () => {
    render(<RaceDate date={DATES.sameDay} />);

    const expected = format(toDay(DATES.sameDay.start!), "dd MMM");
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it("renders a same-month range when days differ", () => {
    render(<RaceDate date={DATES.sameMonth} />);

    const expected = `${format(toDay(DATES.sameMonth.start!), "dd")} - ${format(
      toDay(DATES.sameMonth.end!),
      "dd MMM",
    )}`;
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it("renders a cross-month range", () => {
    render(<RaceDate date={DATES.differentMonth} />);

    const expected = `${format(toDay(DATES.differentMonth.start!), "dd MMM")} - ${format(
      toDay(DATES.differentMonth.end!),
      "dd MMM",
    )}`;
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it("includes year when withYear is true", () => {
    render(<RaceDate date={DATES.sameDay} withYear />);

    const expected = format(toDay(DATES.sameDay.start!), "dd MMM yyyy");
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it("shows relative text when showRelative is true", () => {
    render(<RaceDate date={DATES.sameMonth} showRelative />);

    const expectedRelative = getRelativeText(
      toDay(DATES.sameMonth.start!),
      toDay(DATES.sameMonth.end!),
    );
    expect(screen.getByText(`(${expectedRelative})`)).toBeInTheDocument();
  });

  it("applies additional className", () => {
    const { container } = render(
      <RaceDate date={DATES.sameMonth} className="tracking-wide" />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
