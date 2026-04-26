import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RaceActionBtn from "../RaceActionBtn";

describe("RaceActionBtn", () => {
  it("renders default button text", () => {
    render(<RaceActionBtn onClick={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Live Action" }),
    ).toBeInTheDocument();
  });

  it("renders custom children", () => {
    render(<RaceActionBtn onClick={vi.fn()}>Watch Live</RaceActionBtn>);

    expect(
      screen.getByRole("button", { name: "Watch Live" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<RaceActionBtn onClick={onClick} />);
    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies ariaLabel and className", () => {
    render(
      <RaceActionBtn
        onClick={vi.fn()}
        ariaLabel="Open live action"
        className="tracking-wide"
      />,
    );

    const button = screen.getByRole("button", { name: "Open live action" });
    expect(button).toHaveClass("tracking-wide");
  });
});
