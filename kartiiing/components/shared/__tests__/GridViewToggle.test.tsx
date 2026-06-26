import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Grid, List } from "lucide-react";
import { CircuitsViewMode } from "@/lib/constants/circuits";
import GridViewToggle from "../GridViewToggle";

const OPTIONS = [
  {
    value: CircuitsViewMode.GRID,
    icon: <Grid className="size-4" />,
    label: "Grid view",
  },
  {
    value: CircuitsViewMode.LIST,
    icon: <List className="size-4" />,
    label: "List view",
  },
];

describe("GridViewToggle", () => {
  it("renders toggle buttons for each option", () => {
    render(
      <GridViewToggle
        viewMode={CircuitsViewMode.GRID}
        setViewMode={vi.fn()}
        options={OPTIONS}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Grid view" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "List view" }),
    ).toBeInTheDocument();
  });

  it("calls setViewMode with the correct value when a button is clicked", async () => {
    const mockSetViewMode = vi.fn();
    const user = userEvent.setup();

    render(
      <GridViewToggle
        viewMode={CircuitsViewMode.GRID}
        setViewMode={mockSetViewMode}
        options={OPTIONS}
      />,
    );

    await user.click(screen.getByRole("button", { name: "List view" }));
    expect(mockSetViewMode).toHaveBeenCalledWith(CircuitsViewMode.LIST);

    await user.click(screen.getByRole("button", { name: "Grid view" }));
    expect(mockSetViewMode).toHaveBeenCalledWith(CircuitsViewMode.GRID);
  });

  it("applies the inactive class to non-selected options", () => {
    render(
      <GridViewToggle
        viewMode={CircuitsViewMode.LIST}
        setViewMode={vi.fn()}
        options={OPTIONS}
      />,
    );

    const listBtn = screen.getByRole("button", { name: "List view" });
    const gridBtn = screen.getByRole("button", { name: "Grid view" });

    // The selected (list) button should not have the inactive class
    expect(listBtn.className).not.toContain("opacity-60");
    // The non-selected (grid) button should have the inactive class
    expect(gridBtn.className).toContain("opacity-60");
  });

  it("applies additional className to the container", () => {
    const { container } = render(
      <GridViewToggle
        viewMode={CircuitsViewMode.GRID}
        setViewMode={vi.fn()}
        options={OPTIONS}
        className="tracking-wide"
      />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
