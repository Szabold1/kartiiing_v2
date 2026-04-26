import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { badgeBase, ENGINE_COLORS, grayGlassBase } from "@/lib/utils";
import CategoryBadge from "../CategoryBadge";

const LABELS = {
  kz2Masters: "KZ2 Masters",
  mini: "Mini",
  kz: "KZ",
  custom: "Custom",
  rotax: "Rotax",
} as const;

const ENGINES = {
  kz: "KZ",
  kzLowercase: "kz",
  mini60: "MINI 60",
  rotax: "ROTAX",
  unknown: "UNKNOWN",
} as const;

describe("CategoryBadge", () => {
  it("renders the provided label", () => {
    render(<CategoryBadge label={LABELS.kz2Masters} engineType={ENGINES.kz} />);

    expect(screen.getByText(LABELS.kz2Masters)).toBeInTheDocument();
  });

  it("applies default badge classes", () => {
    render(<CategoryBadge label={LABELS.mini} engineType={ENGINES.mini60} />);

    expect(screen.getByText(LABELS.mini)).toHaveClass(...badgeBase.split(" "));
  });

  it("applies engine color classes from engineType", () => {
    render(<CategoryBadge label={LABELS.kz} engineType={ENGINES.kz} />);

    expect(screen.getByText(LABELS.kz)).toHaveClass(
      ...ENGINE_COLORS[ENGINES.kz].split(" "),
    );
  });

  it("matches engine colors case-insensitively", () => {
    render(
      <CategoryBadge label={LABELS.kz} engineType={ENGINES.kzLowercase} />,
    );

    expect(screen.getByText(LABELS.kz)).toHaveClass(
      ...ENGINE_COLORS[ENGINES.kz].split(" "),
    );
  });

  it("falls back to gray colors for unknown engine types", () => {
    render(
      <CategoryBadge label={LABELS.custom} engineType={ENGINES.unknown} />,
    );

    expect(screen.getByText(LABELS.custom)).toHaveClass(
      ...grayGlassBase.split(" "),
    );
  });

  it("merges additional className with default and color classes", () => {
    render(
      <CategoryBadge
        label={LABELS.rotax}
        engineType={ENGINES.rotax}
        className="tracking-wide"
      />,
    );

    expect(screen.getByText(LABELS.rotax)).toHaveClass(
      "tracking-wide",
      ...ENGINE_COLORS[ENGINES.rotax].split(" "),
    );
  });
});
