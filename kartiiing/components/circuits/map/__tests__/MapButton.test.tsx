import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MapButton } from "../MapButton";

const OPEN_MAP_LABEL = "Open map view";

describe("MapButton", () => {
  it("renders the map button with correct aria-label", () => {
    render(<MapButton onClick={() => {}} />);

    const button = screen.getByRole("button", { name: OPEN_MAP_LABEL });
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<MapButton onClick={handleClick} />);

    const button = screen.getByRole("button", { name: OPEN_MAP_LABEL });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies className prop", () => {
    render(<MapButton onClick={() => {}} className="custom-class" />);

    const button = screen.getByRole("button", { name: OPEN_MAP_LABEL });
    expect(button.className).toContain("custom-class");
  });
});
