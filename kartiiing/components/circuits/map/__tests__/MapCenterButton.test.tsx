import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MapCenterButton } from "../MapCenterButton";
import { flyToCenter } from "@/lib/utils/locationUtils";
import { MapRef } from "react-map-gl/mapbox";

const CENTER_LABEL = "Center on your location";
const USER_LOCATION = { latitude: 47.4979, longitude: 19.0402 };
const ZOOM_LEVEL = 10;

vi.mock("@/lib/utils/locationUtils", () => ({
  flyToCenter: vi.fn(),
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
  lightDarkGlassBase: "glass-base",
  lightDarkGlassOnlyHover: "glass-hover",
}));

function createMockMapRef(): React.RefObject<MapRef | null> {
  return {
    current: {
      getMap: () => ({ flyTo: vi.fn() }),
    } as unknown as MapRef,
  };
}

describe("MapCenterButton", () => {
  it("renders the button when userLocation is provided", () => {
    render(
      <MapCenterButton
        mapRef={createMockMapRef()}
        userLocation={USER_LOCATION}
      />,
    );

    expect(
      screen.getByRole("button", { name: CENTER_LABEL }),
    ).toBeInTheDocument();
  });

  it("does not render when userLocation is null", () => {
    const { container } = render(
      <MapCenterButton mapRef={createMockMapRef()} userLocation={null} />,
    );

    expect(
      screen.queryByRole("button", { name: CENTER_LABEL }),
    ).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it("calls flyToCenter with userLocation and zoom 10 on click", async () => {
    const user = userEvent.setup();
    render(
      <MapCenterButton
        mapRef={createMockMapRef()}
        userLocation={USER_LOCATION}
      />,
    );

    await user.click(screen.getByRole("button", { name: CENTER_LABEL }));

    expect(flyToCenter).toHaveBeenCalledWith(
      expect.any(Object),
      USER_LOCATION,
      ZOOM_LEVEL,
    );
  });
});
