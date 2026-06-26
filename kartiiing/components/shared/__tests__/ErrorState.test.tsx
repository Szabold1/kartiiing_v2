import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorState from "../ErrorState";

describe("ErrorState", () => {
  it("renders the message text", () => {
    render(<ErrorState message="No races found" />);

    expect(screen.getByText("No races found")).toBeInTheDocument();
  });

  it("does not render a title when title is not provided", () => {
    render(<ErrorState message="Something went wrong" />);

    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  it("renders a title when provided", () => {
    render(<ErrorState message="Failed to load" title="Error" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Error" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });
});
