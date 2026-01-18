"use client";

import Image from "next/image";
import { Globe, MapPin } from "lucide-react";
import { grayGlassHover } from "@/lib/classNames";
import { ICircuitDetail, IRaceEventDetail } from "@kartiiing/shared-types";
import RenderRaceLocation from "./renderRaceData/RenderRaceLocation";
import FastestLapsWithDropdown from "./FastestLapsWithDropdown";

type Props = {
  circuit: ICircuitDetail;
  race?: IRaceEventDetail;
};

export default function CircuitInfo({ circuit, race }: Props) {
  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${circuit.longitude},${circuit.latitude},14.85/330x240@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
  const preferredEngineTypes = race ? Object.keys(race.categories) : [];
  const btnStyles = `${grayGlassHover} flex w-10 h-10 items-center justify-center rounded-md`;

  return (
    <>
      <div className="relative h-48 w-full rounded-t-2xl overflow-hidden">
        <Image
          src={mapImageUrl}
          alt={circuit.nameLong}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="p-3">
        <div className="flex justify-between items-center">
          <div className="py-0.5 px-1.5 flex flex-col gap-0.5">
            <RenderRaceLocation circuit={circuit} />
            <h3 className="text-lg font-semibold leading-tight">
              {circuit.nameLong}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {circuit.layout?.name && <>{circuit.layout.name} • </>}
              {circuit.length > 0
                ? `${circuit.length} meters`
                : "Unknown length"}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            {circuit.website && (
              <a
                href={circuit.website}
                target="_blank"
                rel="noopener noreferrer"
                className={btnStyles}
                title="Visit circuit website"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
            {circuit.latitude && circuit.longitude && (
              <a
                href={`https://maps.google.com/?q=${circuit.latitude},${circuit.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className={btnStyles}
                title="Open in Google Maps"
              >
                <MapPin className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
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
