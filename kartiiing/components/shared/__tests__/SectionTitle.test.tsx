import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionTitle from "../SectionTitle";

const defaultTitle = "Test Title";

describe("SectionTitle", () => {
  it("renders the children as text", () => {
    render(<SectionTitle>{defaultTitle}</SectionTitle>);

    expect(screen.getByText(defaultTitle)).toBeInTheDocument();
  });

  it("renders as h3 by default", () => {
    render(<SectionTitle>{defaultTitle}</SectionTitle>);

    expect(
      screen.getByRole("heading", { level: 3, name: defaultTitle }),
    ).toBeInTheDocument();
  });

  it("renders the correct heading level when headerNb is provided", () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;

    levels.forEach((level) => {
      const { unmount } = render(
        <SectionTitle headerNb={level}>{defaultTitle}</SectionTitle>,
      );

      expect(
        screen.getByRole("heading", { level, name: defaultTitle }),
      ).toBeInTheDocument();

      unmount();
    });
  });

  it("applies the default classes", () => {
    const { container } = render(<SectionTitle>{defaultTitle}</SectionTitle>);

    const heading = container.firstChild;
    expect(heading).toHaveClass("text-sm", "text-muted-foreground");
  });

  it("applies additional className when provided", () => {
    const { container } = render(
      <SectionTitle className="font-bold">{defaultTitle}</SectionTitle>,
    );

    const heading = container.firstChild;
    expect(heading).toHaveClass("font-bold");
  });

  it("merges additional className with default classes", () => {
    const { container } = render(
      <SectionTitle className="font-bold">{defaultTitle}</SectionTitle>,
    );

    const heading = container.firstChild;
    expect(heading).toHaveClass(
      "text-sm",
      "text-muted-foreground",
      "font-bold",
    );
  });
});
