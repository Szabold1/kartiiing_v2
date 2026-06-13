import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BackToTopBtn from "../BackToTopBtn";

const BACK_TO_TOP_LABEL = "Back to top";

const setScrollY = (value: number) => {
  Object.defineProperty(window, "pageYOffset", {
    value,
    writable: true,
    configurable: true,
  });
};

describe("BackToTopBtn", () => {
  beforeEach(() => {
    setScrollY(0);
    vi.restoreAllMocks();
  });

  it("is not visible by default", () => {
    render(<BackToTopBtn />);

    expect(
      screen.queryByRole("button", { name: BACK_TO_TOP_LABEL }),
    ).not.toBeInTheDocument();
  });

  it("becomes visible after scrolling past threshold", async () => {
    render(<BackToTopBtn />);

    setScrollY(301);
    fireEvent.scroll(window);

    const button = await screen.findByRole("button", {
      name: BACK_TO_TOP_LABEL,
    });
    expect(button).toBeInTheDocument();
  });

  it("respects a custom visibleOffset", async () => {
    render(<BackToTopBtn visibleOffset={100} />);

    setScrollY(99);
    fireEvent.scroll(window);
    expect(
      screen.queryByRole("button", { name: BACK_TO_TOP_LABEL }),
    ).not.toBeInTheDocument();

    setScrollY(101);
    fireEvent.scroll(window);
    const button = await screen.findByRole("button", {
      name: BACK_TO_TOP_LABEL,
    });
    expect(button).toBeInTheDocument();
  });

  it("scrolls to top with smooth behavior when clicked", async () => {
    const user = userEvent.setup();
    const scrollToSpy = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    render(<BackToTopBtn />);
    setScrollY(350);
    fireEvent.scroll(window);

    const button = await screen.findByRole("button", {
      name: BACK_TO_TOP_LABEL,
    });
    await user.click(button);

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
