import { useState } from "react";
import { GridViewToggle } from "@/components/shared/GridViewToggle";
import { MapButton } from "@/components/circuits/map/MapButton";
import { CircuitsMapModal } from "@/components/circuits/map/CircuitsMapModal";
import {
  OrderDropdown,
  type OrderPreset,
} from "@/components/shared/OrderDropdown";
import { Grid, List, ArrowUp, ArrowDown } from "lucide-react";
import { CircuitsViewMode } from "@/lib/constants/circuits";
import { useCircuitsStore } from "@/lib/stores/circuitsStore";
import { ICircuitCoordinate, CircuitsOrderPreset } from "@kartiiing/shared";

const CIRCUIT_PRESETS: readonly OrderPreset<CircuitsOrderPreset>[] = [
  {
    value: CircuitsOrderPreset.LOCATION_ASC,
    label: "Location name",
    icon: ArrowUp,
  },
  {
    value: CircuitsOrderPreset.LOCATION_DESC,
    label: "Location name",
    icon: ArrowDown,
  },
  {
    value: CircuitsOrderPreset.LENGTH_ASC,
    label: "Length",
    icon: ArrowUp,
  },
  {
    value: CircuitsOrderPreset.LENGTH_DESC,
    label: "Length",
    icon: ArrowDown,
  },
  {
    value: CircuitsOrderPreset.DISTANCE_ASC,
    label: "Distance",
    icon: ArrowUp,
  },
  {
    value: CircuitsOrderPreset.DISTANCE_DESC,
    label: "Distance",
    icon: ArrowDown,
  },
] as const;

type Props = {
  coordinates: ICircuitCoordinate[];
  preset: CircuitsOrderPreset;
  onPresetChange: (preset: CircuitsOrderPreset) => void;
  locationUnavailable?: boolean;
  small?: boolean;
};

export function CircuitsActions({
  coordinates,
  preset,
  onPresetChange,
  locationUnavailable = false,
  small = false,
}: Props) {
  const { viewMode, setViewMode } = useCircuitsStore();
  const [showMapModal, setShowMapModal] = useState(false);

  const options = [
    {
      value: CircuitsViewMode.GRID,
      icon: <Grid className="size-4" />,
      label: "Grid view",
    },
    {
      value: CircuitsViewMode.LIST,
      icon: <List className="size-4" />,
      label: "List view",
    },
  ];

  const availablePresets = locationUnavailable
    ? CIRCUIT_PRESETS.filter(
        (p) =>
          p.value !== CircuitsOrderPreset.DISTANCE_ASC &&
          p.value !== CircuitsOrderPreset.DISTANCE_DESC,
      )
    : CIRCUIT_PRESETS;

  const button = (
    <>
      <MapButton onClick={() => setShowMapModal(true)} />
      <CircuitsMapModal
        coordinates={coordinates}
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
      />
    </>
  );

  const alwaysDisplay = () => {
    return (
      <>
        {button}
        <OrderDropdown
          value={preset}
          onChange={onPresetChange}
          presets={availablePresets}
          className="text-foreground"
        />
      </>
    );
  };

  if (small) {
    return <div className="flex items-center gap-2">{alwaysDisplay()}</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <GridViewToggle
        viewMode={viewMode}
        setViewMode={setViewMode}
        options={options}
      />
      {alwaysDisplay()}
    </div>
  );
}
