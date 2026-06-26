"use client";

import { Marker } from "react-map-gl/mapbox";
import { ICircuit } from "@kartiiing/shared";
import { Button } from "@/components/ui/button";
import { cn, noBlurGlassBase } from "@/lib/utils";
import { X } from "lucide-react";
import CircuitInfoContent from "@/components/circuit/CircuitInfoContent";

type Props = {
  circuit: ICircuit;
  onClose: () => void;
};

const noBlurGlassHover = `${noBlurGlassBase} hover:shadow hover:border-gray-400 hover:bg-gray-100 dark:hover:border-gray-400 transition`;

export default function CircuitMapPopup({ circuit, onClose }: Props) {
  return (
    <Marker
      longitude={circuit.coordinates.longitude}
      latitude={circuit.coordinates.latitude}
      anchor="bottom"
    >
      <div className="relative overflow-visible -translate-y-3 text-[1rem]">
        {/* Card */}
        <article
          className={cn(
            "p-4 flex flex-col overflow-hidden rounded-2xl w-full cursor-pointer max-w-[18rem]",
            noBlurGlassHover,
          )}
        >
          <CircuitInfoContent circuit={circuit} showActions={false} />
        </article>

        {/* Arrow pointing down to the marker */}
        <div className="flex justify-center -mt-px">
          <div
            className={cn(
              "w-3 h-3 rotate-45 translate-y-[-5px]",
              noBlurGlassBase,
            )}
          />
        </div>

        {/* Close button */}
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close popup"
          className={cn(
            "absolute -top-3 -right-3 size-8 z-10 rounded-full",
            noBlurGlassHover,
          )}
        >
          <X className="size-4" />
        </Button>
      </div>
    </Marker>
  );
}
