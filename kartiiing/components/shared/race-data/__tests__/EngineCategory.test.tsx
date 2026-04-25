import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EngineCategory from "../EngineCategory";

const ENGINE_CATEGORY_PAIRS: Record<string, string[]> = {
  KZ: ["KZ", "KZ2"],
  ROTAX: ["Micro", "Mini"],
};

describe("EngineCategory", () => {
  it("renders one badge per engine by default", () => {
    render(<EngineCategory engineCategoryPairs={ENGINE_CATEGORY_PAIRS} />);

    expect(screen.getByText("KZ")).toBeInTheDocument();
    expect(screen.getByText("ROTAX")).toBeInTheDocument();
    expect(screen.queryByText("KZ2")).not.toBeInTheDocument();
    expect(screen.queryByText("Micro")).not.toBeInTheDocument();
  });

  it("renders all categories when showAll is true", () => {
    render(
      <EngineCategory engineCategoryPairs={ENGINE_CATEGORY_PAIRS} showAll />,
    );

    expect(screen.getByText("KZ")).toBeInTheDocument();
    expect(screen.getByText("KZ2")).toBeInTheDocument();
    expect(screen.getByText("Micro")).toBeInTheDocument();
    expect(screen.getByText("Mini")).toBeInTheDocument();
    expect(screen.queryByText("ROTAX")).not.toBeInTheDocument();
  });

  it("applies wrapper className", () => {
    const { container } = render(
      <EngineCategory
        engineCategoryPairs={ENGINE_CATEGORY_PAIRS}
        className="justify-end"
      />,
    );

    expect(container.firstChild).toHaveClass("justify-end");
  });

  it("applies badgeClassName to all rendered badges", () => {
    const { container } = render(
      <EngineCategory
        engineCategoryPairs={ENGINE_CATEGORY_PAIRS}
        showAll
        badgeClassName="tracking-wide"
      />,
    );

    const badges = container.querySelectorAll("span");
    expect(badges).toHaveLength(4);
    badges.forEach((badge) => {
      expect(badge).toHaveClass("tracking-wide");
    });
  });
});
