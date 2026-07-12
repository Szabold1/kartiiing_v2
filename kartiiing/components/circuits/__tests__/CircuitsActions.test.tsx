import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { CircuitsActions } from "../CircuitsActions";
import * as circuitsStore from "@/lib/stores/circuitsStore";
import { CircuitsViewMode } from "@/lib/constants/circuits";
import { CircuitsOrderPreset, ICircuitCoordinate } from "@kartiiing/shared";

const GRID_VIEW_LABEL = "Grid view";
const LIST_VIEW_LABEL = "List view";
const OPEN_MAP_LABEL = "Open map view";
const CLOSE_MAP_LABEL = "Close map";

const DEFAULT_PROPS = {
  coordinates: [] as ICircuitCoordinate[],
  preset: CircuitsOrderPreset.LOCATION_ASC,
  onPresetChange: vi.fn(),
};

vi.mock("@/lib/stores/circuitsStore", () => ({
  useCircuitsStore: vi.fn(),
}));

vi.mock("@/components/circuits/map/CircuitsMapModal", () => ({
  CircuitsMapModal: function MockModal({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) {
    return isOpen ? (
      <button onClick={onClose} aria-label="Close map">
        Close
      </button>
    ) : null;
  },
}));

describe("CircuitsActions", () => {
  beforeEach(() => {
    vi.mocked(circuitsStore.useCircuitsStore).mockReturnValue({
      viewMode: CircuitsViewMode.GRID,
      setViewMode: vi.fn(),
    });
  });

  it("renders the MapButton", () => {
    render(<CircuitsActions {...DEFAULT_PROPS} />);

    expect(
      screen.getByRole("button", { name: OPEN_MAP_LABEL }),
    ).toBeInTheDocument();
  });

  it("renders GridViewToggle options by default", () => {
    render(<CircuitsActions {...DEFAULT_PROPS} />);

    expect(
      screen.getByRole("button", { name: GRID_VIEW_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: LIST_VIEW_LABEL }),
    ).toBeInTheDocument();
  });

  it("does not render GridViewToggle in small mode", () => {
    render(<CircuitsActions {...DEFAULT_PROPS} small />);

    expect(
      screen.queryByRole("button", { name: GRID_VIEW_LABEL }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: LIST_VIEW_LABEL }),
    ).not.toBeInTheDocument();
  });

  it("opens the map modal when MapButton is clicked", async () => {
    const user = userEvent.setup();
    render(<CircuitsActions {...DEFAULT_PROPS} />);

    expect(
      screen.queryByRole("button", { name: CLOSE_MAP_LABEL }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: OPEN_MAP_LABEL }));

    expect(
      screen.getByRole("button", { name: CLOSE_MAP_LABEL }),
    ).toBeInTheDocument();
  });

  it("closes the map modal when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<CircuitsActions {...DEFAULT_PROPS} />);

    await user.click(screen.getByRole("button", { name: OPEN_MAP_LABEL }));
    expect(
      screen.getByRole("button", { name: CLOSE_MAP_LABEL }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: CLOSE_MAP_LABEL }));
    expect(
      screen.queryByRole("button", { name: CLOSE_MAP_LABEL }),
    ).not.toBeInTheDocument();
  });

  it("calls setViewMode when a view mode is toggled", async () => {
    const setViewMode = vi.fn();
    vi.mocked(circuitsStore.useCircuitsStore).mockReturnValue({
      viewMode: CircuitsViewMode.GRID,
      setViewMode,
    });
    const user = userEvent.setup();

    render(<CircuitsActions {...DEFAULT_PROPS} />);

    await user.click(screen.getByRole("button", { name: LIST_VIEW_LABEL }));

    expect(setViewMode).toHaveBeenCalledWith(CircuitsViewMode.LIST);
  });

  it("renders the OrderDropdown", () => {
    render(<CircuitsActions {...DEFAULT_PROPS} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders OrderDropdown with the current preset label", () => {
    render(
      <CircuitsActions
        {...DEFAULT_PROPS}
        preset={CircuitsOrderPreset.LOCATION_ASC}
      />,
    );

    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveTextContent("Location name");
  });
});
