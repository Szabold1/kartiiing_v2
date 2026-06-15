import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EngineStyledSelect from "../EngineStyledSelect";

describe("EngineStyledSelect", () => {
  const options = ["KZ", "KZ2", "OK"];

  it("returns null when options array is empty", () => {
    const { container } = render(
      <EngineStyledSelect
        label="Engine Type"
        options={[]}
        value=""
        onValueChange={vi.fn()}
        isOpen={false}
        onOpenChange={vi.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders a combobox with correct aria-label", () => {
    render(
      <EngineStyledSelect
        label="Engine Type"
        options={options}
        value="KZ"
        onValueChange={vi.fn()}
        isOpen={false}
        onOpenChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Select Engine Type" }),
    ).toBeInTheDocument();
  });

  it("renders all option items when options are provided", () => {
    render(
      <EngineStyledSelect
        label="Category"
        options={options}
        value="KZ"
        onValueChange={vi.fn()}
        isOpen
        onOpenChange={vi.fn()}
      />,
    );

    // KZ appears in both trigger and dropdown, so expect at least 2
    expect(screen.getAllByText("KZ")).toHaveLength(2);
    expect(screen.getByText("KZ2")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });
});
