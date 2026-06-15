import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IWeatherDataDay } from "@kartiiing/shared";
import { formatDate } from "@/lib/utils";
import WeatherDayCard from "../WeatherDayCard";

const day: IWeatherDataDay = {
  date: "2025-06-04",
  condition: { name: "Sunny", icon: "clear-day" },
  temp: { min: 15, max: 25, avg: 20 },
  wind: { speed: 10 },
  precipitationMm: 2.5,
};

describe("WeatherDayCard", () => {
  it("renders date and condition name in collapsed state", () => {
    render(<WeatherDayCard day={day} isExpanded={false} onToggle={vi.fn()} />);

    expect(screen.getByText(formatDate(day.date, false))).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
  });

  it("renders average temperature in collapsed state", () => {
    render(<WeatherDayCard day={day} isExpanded={false} onToggle={vi.fn()} />);

    expect(screen.getByText("20 ℃")).toBeInTheDocument();
  });

  it("has aria-expanded false when collapsed", () => {
    render(<WeatherDayCard day={day} isExpanded={false} onToggle={vi.fn()} />);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("shows wind and precipitation metrics when expanded", () => {
    render(<WeatherDayCard day={day} isExpanded onToggle={vi.fn()} />);

    expect(screen.getByTitle(/Precipitation/)).toBeInTheDocument();
    expect(screen.getByTitle(/Wind/)).toBeInTheDocument();
  });

  it("does not show metrics when collapsed", () => {
    render(<WeatherDayCard day={day} isExpanded={false} onToggle={vi.fn()} />);

    expect(screen.queryByTitle(/Precipitation/)).not.toBeInTheDocument();
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(<WeatherDayCard day={day} isExpanded={false} onToggle={onToggle} />);
    await user.click(screen.getByRole("button"));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard toggle with Enter", () => {
    const onToggle = vi.fn();

    render(<WeatherDayCard day={day} isExpanded={false} onToggle={onToggle} />);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows gust range in wind value when gust is provided", () => {
    const withGust = { ...day, wind: { speed: 10, gust: 15 } };
    render(<WeatherDayCard day={withGust} isExpanded onToggle={vi.fn()} />);

    expect(screen.getByTitle(/Wind: 10 - 15 km\/h/)).toBeInTheDocument();
  });
});
