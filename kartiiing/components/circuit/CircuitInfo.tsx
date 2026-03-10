import Image from "next/image";
import { ICircuitDetail, IRaceEventDetail } from "@kartiiing/shared-types";
import FastestLapsWithDropdown from "./FastestLapsWithDropdown";
import CircuitInfoContent from "./CircuitInfoContent";

type Props = {
  circuit: ICircuitDetail;
  race?: IRaceEventDetail;
};

export default function CircuitInfo({ circuit, race }: Props) {
  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${circuit.longitude},${circuit.latitude},14.85/360x270@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
  const preferredEngineTypes = race ? Object.keys(race.categories) : [];

  return (
    <>
      <div className="relative h-48 w-full rounded-t-2xl overflow-hidden">
        <Image
          src={mapImageUrl}
          alt={circuit.name}
          fill
          sizes="360px"
          className="dark:brightness-85 transition-all duration-300 object-cover"
        />
      </div>

      <div className="p-3">
        <CircuitInfoContent circuit={circuit} />
        {circuit.circuitFastestLaps &&
          circuit.circuitFastestLaps.length > 0 && (
            <div className="mt-3 pt-4 border-t border-gray-300 dark:border-gray-700">
              <FastestLapsWithDropdown
                fastestLaps={circuit.circuitFastestLaps}
                showYears={true}
                preferredEngineTypes={preferredEngineTypes}
              />
            </div>
          )}
      </div>
    </>
  );
}
