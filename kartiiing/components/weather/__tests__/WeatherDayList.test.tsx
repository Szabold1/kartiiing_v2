import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { IWeatherDataDay } from "@kartiiing/shared";
import { formatDate } from "@/lib/utils";
import WeatherDayList from "../WeatherDayList";

const days: IWeatherDataDay[] = [
  {
    date: "2025-06-01",
    condition: { name: "Cloudy", icon: "cloudy" },
    temp: { min: 10, max: 18, avg: 14 },
    wind: { speed: 5 },
    precipitationMm: 1,
  },
  {
    date: "2025-06-02",
    condition: { name: "Rain", icon: "rain" },
    temp: { min: 12, max: 20, avg: 16 },
    wind: { speed: 8 },
    precipitationMm: 5,
  },
  {
    date: "2025-06-03",
    condition: { name: "Sunny", icon: "clear-day" },
    temp: { min: 15, max: 25, avg: 20 },
    wind: { speed: 3 },
    precipitationMm: 0,
  },
];

describe("WeatherDayList", () => {
  it("returns null when days array is empty", () => {
    const { container } = render(<WeatherDayList days={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders all day cards", () => {
    render(<WeatherDayList days={days} />);

    expect(
      screen.getByText(formatDate(days[0].date, false)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(days[1].date, false)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(days[2].date, false)),
    ).toBeInTheDocument();
  });

  it("pre-expands the last day by default", () => {
    render(<WeatherDayList days={days} />);

    const buttons = screen.getAllByRole("button");
    const lastButton = buttons[buttons.length - 1];
    expect(lastButton).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles day expansion when clicked", async () => {
    const user = userEvent.setup();
    render(<WeatherDayList days={days} />);

    const buttons = screen.getAllByRole("button");
    const firstButton = buttons[0];

    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
  });

  it("applies additional className", () => {
    const { container } = render(
      <WeatherDayList days={days} className="tracking-wide" />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
