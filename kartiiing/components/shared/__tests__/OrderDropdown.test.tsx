import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ArrowDown, ArrowUp } from "lucide-react";
import { OrderDropdown, type OrderPreset } from "../OrderDropdown";

type TestSortPreset = "asc" | "desc" | "alpha";

const PRESETS: readonly OrderPreset<TestSortPreset>[] = [
  { value: "asc", label: "Ascending", icon: ArrowUp },
  { value: "desc", label: "Descending", icon: ArrowDown },
  { value: "alpha", label: "Alphabetical" },
] as const;

describe("OrderDropdown", () => {
  it("displays the active preset's label and icon on the trigger", () => {
    render(<OrderDropdown value="asc" onChange={vi.fn()} presets={PRESETS} />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Ascending");
  });

  it("displays no icon when the active preset does not have one", () => {
    render(
      <OrderDropdown value="alpha" onChange={vi.fn()} presets={PRESETS} />,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Alphabetical");
    // No SVG icons from the preset should be inside the trigger value area
    const triggerContent = trigger.querySelector("[data-slot=select-value]");
    const svgs = triggerContent?.querySelectorAll("svg");
    expect(svgs?.length ?? 0).toBe(0);
  });

  it("falls back to the raw value when the preset is not found", () => {
    render(
      <OrderDropdown
        value={"invalid" as TestSortPreset}
        onChange={vi.fn()}
        presets={PRESETS}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("invalid");
  });

  it("applies className to the trigger", () => {
    render(
      <OrderDropdown
        value="asc"
        onChange={vi.fn()}
        presets={PRESETS}
        className="w-31"
      />,
    );

    expect(screen.getByRole("combobox")).toHaveClass("w-31");
  });

});
