import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHeader from "../PageHeader";

const defaultTitle = "Test Title";
const defaultDescription = "2025 karting season schedule";

describe("PageHeader", () => {
  it("renders the title", () => {
    render(<PageHeader title={defaultTitle} />);

    expect(
      screen.getByRole("heading", { level: 1, name: defaultTitle }),
    ).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(<PageHeader title={defaultTitle} description={defaultDescription} />);

    expect(screen.getByText(defaultDescription)).toBeInTheDocument();
  });

  it("does not render a description when not provided", () => {
    render(<PageHeader title={defaultTitle} />);

    expect(screen.queryByText(defaultDescription)).not.toBeInTheDocument();
  });

  it("renders a headerAction when provided", () => {
    const actionLabel = "Select Year";
    render(
      <PageHeader
        title={defaultTitle}
        headerAction={<button>{actionLabel}</button>}
      />,
    );

    expect(
      screen.getByRole("button", { name: actionLabel }),
    ).toBeInTheDocument();
  });

  it("applies flex-col layout when actionLayout is vertical", () => {
    const { container } = render(
      <PageHeader
        title={defaultTitle}
        actionLayout="vertical"
        headerAction={<button>Back</button>}
      />,
    );

    expect(container.querySelector(".flex")).toHaveClass("flex-col");
  });

  it("does not apply flex-col when actionLayout is horizontal (default)", () => {
    const { container } = render(
      <PageHeader
        title={defaultTitle}
        headerAction={<button>Select Year</button>}
      />,
    );

    expect(container.querySelector(".flex")).not.toHaveClass("flex-col");
  });
});
