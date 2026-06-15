import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { badgeBase, grayGlassBase } from "@/lib/utils";
import Badge from "../Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>KZ2</Badge>);

    expect(screen.getByText("KZ2")).toBeInTheDocument();
  });

  it("applies default badge and glass base classes", () => {
    render(<Badge>Test</Badge>);

    const el = screen.getByText("Test");
    expect(el).toHaveClass(...badgeBase.split(" "));
    expect(el).toHaveClass(...grayGlassBase.split(" "));
  });

  it("merges additional className", () => {
    render(<Badge className="tracking-wide">Test</Badge>);

    expect(screen.getByText("Test")).toHaveClass("tracking-wide");
  });
});
