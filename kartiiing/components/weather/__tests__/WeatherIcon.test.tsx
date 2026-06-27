import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WeatherIcon } from "../WeatherIcon";

describe("WeatherIcon", () => {
  it("renders a container with grayGlassBase classes", () => {
    const { container } = render(<WeatherIcon condition={undefined} />);

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "rounded-lg",
    );
  });

  it("renders an icon for a known condition", () => {
    const { container } = render(
      <WeatherIcon condition={{ name: "Sunny", icon: "clear-day" }} />,
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a fallback icon when condition is undefined", () => {
    const { container } = render(<WeatherIcon condition={undefined} />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies additional className", () => {
    const { container } = render(
      <WeatherIcon
        condition={{ name: "Cloudy", icon: "cloudy" }}
        className="tracking-wide"
      />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
