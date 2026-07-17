import { useState } from 'react';
import { GridViewToggle } from '@/components/shared/GridViewToggle';
import { MapButton } from '@/components/circuits/map/MapButton';
import { CircuitsMapModal } from '@/components/circuits/map/CircuitsMapModal';
import { OrderDropdown } from '@/components/shared/OrderDropdown';
import {
  CIRCUIT_PRESETS,
  CIRCUITS_VIEW_OPTIONS,
} from '@/lib/constants/circuits';
import { useCircuitsStore } from '@/lib/stores/circuitsStore';
import { ICircuitCoordinate, CircuitsOrderPreset } from '@kartiiing/shared';

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
        options={CIRCUITS_VIEW_OPTIONS}
      />
      {alwaysDisplay()}
    </div>
  );
}
