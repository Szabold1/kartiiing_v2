import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import GoBackBtn from "../GoBackBtn";

const BACK_LABEL = "Go back";

const back = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back }),
}));

describe("GoBackBtn", () => {
  beforeEach(() => {
    back.mockClear();
  });

  it("renders a go back button", () => {
    render(<GoBackBtn />);

    expect(
      screen.getByRole("button", { name: BACK_LABEL }),
    ).toBeInTheDocument();
  });

  it("calls router.back when clicked", async () => {
    const user = userEvent.setup();
    render(<GoBackBtn />);

    await user.click(screen.getByRole("button", { name: BACK_LABEL }));

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("applies additional className", () => {
    render(<GoBackBtn className="tracking-wide" />);

    expect(screen.getByRole("button", { name: BACK_LABEL })).toHaveClass(
      "tracking-wide",
    );
  });
});
