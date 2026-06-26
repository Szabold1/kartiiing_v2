import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { MapRef } from "react-map-gl/mapbox";
import MapZoomControl from "../MapZoomControl";

const ZOOM_IN_LABEL = "Zoom in";
const ZOOM_OUT_LABEL = "Zoom out";

describe("MapZoomControl", () => {
  it("renders zoom in and zoom out buttons", () => {
    const mapRef = { current: null };
    render(<MapZoomControl mapRef={mapRef} />);

    expect(
      screen.getByRole("button", { name: ZOOM_IN_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: ZOOM_OUT_LABEL }),
    ).toBeInTheDocument();
  });

  it("calls zoomIn on the map when zoom in is clicked", async () => {
    const zoomIn = vi.fn();
    const mapRef = {
      current: { getMap: () => ({ zoomIn }) },
    } as unknown as React.RefObject<MapRef | null>;
    const user = userEvent.setup();

    render(<MapZoomControl mapRef={mapRef} />);

    await user.click(screen.getByRole("button", { name: ZOOM_IN_LABEL }));

    expect(zoomIn).toHaveBeenCalledTimes(1);
    expect(zoomIn).toHaveBeenCalledWith({ duration: 300 });
  });

  it("calls zoomOut on the map when zoom out is clicked", async () => {
    const zoomOut = vi.fn();
    const mapRef = {
      current: { getMap: () => ({ zoomOut }) },
    } as unknown as React.RefObject<MapRef | null>;
    const user = userEvent.setup();

    render(<MapZoomControl mapRef={mapRef} />);

    await user.click(screen.getByRole("button", { name: ZOOM_OUT_LABEL }));

    expect(zoomOut).toHaveBeenCalledTimes(1);
    expect(zoomOut).toHaveBeenCalledWith({ duration: 300 });
  });

  it("handles mapRef.current being null gracefully", async () => {
    const mapRef = { current: null };
    const user = userEvent.setup();

    render(<MapZoomControl mapRef={mapRef} />);

    await user.click(screen.getByRole("button", { name: ZOOM_IN_LABEL }));
    await user.click(screen.getByRole("button", { name: ZOOM_OUT_LABEL }));
    // Should not throw
  });

  it("applies className prop", () => {
    const mapRef = { current: null };
    const { container } = render(
      <MapZoomControl mapRef={mapRef} className="custom-class" />,
    );

    const zoomControl = container.firstChild as HTMLElement;
    expect(zoomControl.className).toContain("custom-class");
  });
});
