import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusResultsBadge from "../StatusResultsBadge";
import {
  IResultsLink,
  RaceStatus,
  type IRaceEvent,
} from "@kartiiing/shared-types";
import { buildRace } from "@/test/fixtures";

const raceBase: IRaceEvent = buildRace();
const URLS = {
  results: "https://results.com",
  kz: "https://kz.com",
  ok: "https://ok.com",
} as const;

const RESULTS_LINKS = {
  single: [{ category: "KZ", url: URLS.results }] as IResultsLink[],
  multiple: [
    { category: "KZ", url: URLS.kz },
    { category: "OK", url: URLS.ok },
  ] as IResultsLink[],
} as const;

describe("StatusResultsBadge", () => {
  it("renders nothing when no results and no status", () => {
    const race = {
      ...raceBase,
      status: undefined,
      links: undefined,
    };
    const { container } = render(<StatusResultsBadge race={race} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders a status badge with the correct text", () => {
    const race = {
      ...raceBase,
      status: RaceStatus.UPCOMING,
    };
    render(<StatusResultsBadge race={race} />);

    expect(screen.getByText(RaceStatus.UPCOMING)).toBeInTheDocument();
  });

  it("renders a single results link as an anchor", () => {
    const race = {
      ...raceBase,
      links: { results: RESULTS_LINKS.single },
    };
    render(<StatusResultsBadge race={race} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", RESULTS_LINKS.single[0].url);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders a dropdown trigger when multiple result links are provided", () => {
    const race = {
      ...raceBase,
      links: { results: RESULTS_LINKS.multiple },
    };
    render(<StatusResultsBadge race={race} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("applies default height of 2.5rem when heightValue is not provided", () => {
    const race: IRaceEvent = {
      ...raceBase,
      links: undefined,
      status: RaceStatus.UPCOMING,
    };
    render(<StatusResultsBadge race={race} />);

    const badge = screen.getByText(RaceStatus.UPCOMING);
    expect(badge).toHaveStyle({ height: "2.5rem" }); // 10 * 0.25 = 2.5
  });

  it("applies custom height when heightValue is provided", () => {
    const race: IRaceEvent = {
      ...raceBase,
      links: undefined,
      status: RaceStatus.UPCOMING,
    };
    render(<StatusResultsBadge race={race} heightValue="8" />);

    const badge = screen.getByText(RaceStatus.UPCOMING);
    expect(badge).toHaveStyle({ height: "2rem" }); // 8 * 0.25 = 2
  });

  it("applies height to the anchor when a single result link is shown", () => {
    const race: IRaceEvent = {
      ...raceBase,
      status: undefined,
      links: { results: RESULTS_LINKS.single },
    };
    render(<StatusResultsBadge race={race} heightValue="12" />);

    const link = screen.getByRole("link");
    expect(link).toHaveStyle({ height: "3rem" }); // 12 * 0.25 = 3
  });

  it("applies height to the select trigger when multiple result links are shown", () => {
    const race: IRaceEvent = {
      ...raceBase,
      status: undefined,
      links: {
        results: RESULTS_LINKS.multiple,
      },
    };
    render(<StatusResultsBadge race={race} heightValue="6" />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveStyle({ height: "1.5rem" }); // 6 * 0.25 = 1.5
  });
});
