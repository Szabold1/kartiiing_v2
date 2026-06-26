import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { buildFastestLap } from "@/test/fixtures";
import FastestLapCard from "../FastestLapCard";

const SESSION_TYPE = "Final";
const lap = buildFastestLap({
  category: "KZ2",
  engineType: "KZ",
  driverName: "John Doe",
  lapTime: 54321,
  sessionType: SESSION_TYPE,
  date: "2025-06-04",
});

describe("FastestLapCard", () => {
  // --- expandable variant (default) ---

  it("renders category badge and lap time in collapsed state", () => {
    render(<FastestLapCard lap={lap} />);

    expect(screen.getByText("KZ2")).toBeInTheDocument();
    expect(screen.getByText("54.321")).toBeInTheDocument();
  });

  it("renders date badge in collapsed state", () => {
    render(<FastestLapCard lap={lap} />);

    expect(screen.getByText("4 Jun")).toBeInTheDocument();
  });

  it("has aria-expanded false by default", () => {
    render(<FastestLapCard lap={lap} />);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(<FastestLapCard lap={lap} onToggle={onToggle} />);
    await user.click(screen.getByRole("button"));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard toggle with Enter", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    render(<FastestLapCard lap={lap} onToggle={onToggle} />);
    screen.getByRole("button").focus();

    await user.keyboard("{Enter}");

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows driver info when expanded", () => {
    render(<FastestLapCard lap={lap} isExpanded />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(SESSION_TYPE)).toBeInTheDocument();
  });

  it("has aria-expanded true when expanded", () => {
    render(<FastestLapCard lap={lap} isExpanded />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  // --- compact variant ---

  it("renders compact variant without expand/collapse behavior", () => {
    const lapWithEvent = buildFastestLap({
      eventTitle: "Italian GP",
      driverName: "Jane Doe",
      lapTime: 60000,
      sessionType: "Quali",
      date: "2025-07-15",
    });

    render(<FastestLapCard lap={lapWithEvent} variant="compact" />);

    expect(screen.getByText("Italian GP")).toBeInTheDocument();
    expect(screen.getByText("1:00.000")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("falls back to session type badge in compact when no eventTitle", () => {
    render(<FastestLapCard lap={lap} variant="compact" />);

    expect(screen.getByText(SESSION_TYPE)).toBeInTheDocument();
  });
});
