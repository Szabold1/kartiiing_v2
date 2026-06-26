import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { RaceStatus } from "@kartiiing/shared";
import { buildRace } from "@/test/fixtures";
import RaceCard from "../RaceCard";

const RACE_TITLE = "Test Race 2025";
const RACE_DATE_STRING = "01 - 04 Jun";
const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("RaceCard", () => {
  beforeEach(() => {
    push.mockClear();
  });

  const race = buildRace({
    id: 1,
    title: RACE_TITLE,
    slug: "test-race-2025",
    date: { start: "2025-06-01", end: "2025-06-04", year: 2025 },
  });

  // --- card variant (default) ---

  it("renders title and date in card variant", () => {
    render(<RaceCard race={race} />);

    expect(screen.getByText(RACE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(RACE_DATE_STRING)).toBeInTheDocument();
  });

  it("renders location name in card variant", () => {
    render(<RaceCard race={race} />);

    expect(screen.getByText(race.circuit.locationName)).toBeInTheDocument();
  });

  it("calls router.push with the correct URL on click", async () => {
    const user = userEvent.setup();
    render(<RaceCard race={race} />);

    await user.click(screen.getByRole("button"));

    expect(push).toHaveBeenCalledWith(`/race/${race.slug}/${race.id}`);
  });

  it("supports keyboard navigation with Enter", async () => {
    const user = userEvent.setup();
    render(<RaceCard race={race} />);

    await user.type(screen.getByRole("button"), "{Enter}");

    expect(push).toHaveBeenCalledWith(`/race/${race.slug}/${race.id}`);
  });

  it("supports keyboard navigation with Space", async () => {
    const user = userEvent.setup();
    render(<RaceCard race={race} />);

    await user.type(screen.getByRole("button"), " ");

    expect(push).toHaveBeenCalledWith(`/race/${race.slug}/${race.id}`);
  });

  it("sets correct aria-label", () => {
    render(<RaceCard race={race} />);

    expect(
      screen.getByRole("button", {
        name: `View details for ${race.title} at ${race.circuit.locationName} - ${race.date.end}`,
      }),
    ).toBeInTheDocument();
  });

  it("applies LIVE styling when race is live", () => {
    const liveRace = buildRace({ status: RaceStatus.LIVE });
    render(<RaceCard race={liveRace} />);

    const article = screen.getByRole("button");
    expect(article).toHaveClass("bg-red-100/50");
  });

  it("renders StatusResultsBadge when race has a status", () => {
    const upcomingRace = buildRace({ status: RaceStatus.UPCOMING });
    render(<RaceCard race={upcomingRace} />);

    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("renders StatusResultsBadge when race has results links", () => {
    const raceWithResults = buildRace({
      links: { results: [{ category: "KZ", url: "https://results.com" }] },
    });
    render(<RaceCard race={raceWithResults} />);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  // --- row variant ---

  it("renders title and date in row variant", () => {
    render(<RaceCard race={race} variant="row" />);

    expect(screen.getByText(RACE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(RACE_DATE_STRING)).toBeInTheDocument();
  });

  it("applies row-specific classes in list view", () => {
    render(<RaceCard race={race} variant="row" />);

    const article = screen.getByRole("button");
    expect(article).toHaveClass("flex");
  });
});
