import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RaceEventSortOptions } from "@kartiiing/shared";
import SortOrderToggle from "../SortOrderToggle";

describe("SortOrderToggle", () => {
  it("displays ascending icon when sort order is ASC", () => {
    render(
      <SortOrderToggle
        sortOrder={RaceEventSortOptions.ASC}
        onToggle={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /ascending/i }),
    ).toBeInTheDocument();
  });

  it("displays descending icon when sort order is DESC", () => {
    render(
      <SortOrderToggle
        sortOrder={RaceEventSortOptions.DESC}
        onToggle={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /descending/i }),
    ).toBeInTheDocument();
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <SortOrderToggle
        sortOrder={RaceEventSortOptions.ASC}
        onToggle={onToggle}
      />,
    );

    await user.click(screen.getByRole("button"));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("applies additional className", () => {
    render(
      <SortOrderToggle
        sortOrder={RaceEventSortOptions.ASC}
        onToggle={vi.fn()}
        className="tracking-wide"
      />,
    );

    expect(screen.getByRole("button")).toHaveClass("tracking-wide");
  });
});
