import { useState } from "react";
import GridViewToggle from "@/components/shared/GridViewToggle";
import MapButton from "@/components/circuits/map/MapButton";
import CircuitsMapModal from "@/components/circuits/map/CircuitsMapModal";
import { Grid, List } from "lucide-react";
import { CircuitsViewMode } from "@/lib/constants/circuits";
import { useCircuitsStore } from "@/lib/stores/circuitsStore";
import { ICircuitCoordinate } from "@kartiiing/shared";

type Props = {
  coordinates: ICircuitCoordinate[];
  small?: boolean;
};

export default function CircuitsActions({ coordinates, small = false }: Props) {
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

  if (small) {
    return <div className="flex items-center gap-2">{button}</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <GridViewToggle
        viewMode={viewMode}
        setViewMode={setViewMode}
        options={options}
      />
      {button}
    </div>
  );
}
