import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loader } from "../Loader";

describe("Loader", () => {
  it("renders a spinner with animate-spin class", () => {
    const { container } = render(<Loader />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("animate-spin");
  });

  it("accepts a custom size prop", () => {
    const { container } = render(<Loader size={48} />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renders a container with flex centering", () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toHaveClass(
      "flex",
      "justify-center",
      "items-center",
    );
  });
});
