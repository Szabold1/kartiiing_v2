'use client';

import { Marker } from 'react-map-gl/mapbox';
import { ICircuit } from '@kartiiing/shared';
import { Button } from '@/components/ui/button';
import { cn, noBlurGlassBase } from '@/lib/utils';
import { X } from 'lucide-react';
import { CircuitInfoContent } from '@/components/circuit/CircuitInfoContent';

type Props = {
  circuit: ICircuit;
  onClose: () => void;
};

const noBlurGlassHover = `${noBlurGlassBase} hover:shadow hover:border-gray-400 hover:bg-gray-100 dark:hover:border-gray-400 transition`;

export function CircuitMapPopup({ circuit, onClose }: Props) {
  return (
    <Marker
      longitude={circuit.coordinates.longitude}
      latitude={circuit.coordinates.latitude}
      anchor="bottom"
    >
      <div className="relative -translate-y-3 overflow-visible text-[1rem]">
        {/* Card */}
        <article
          className={cn(
            'flex w-full max-w-[18rem] cursor-pointer flex-col overflow-hidden rounded-2xl p-4',
            noBlurGlassHover,
          )}
        >
          <CircuitInfoContent circuit={circuit} showActions={false} />
        </article>

        {/* Arrow pointing down to the marker */}
        <div className="-mt-px flex justify-center">
          <div
            className={cn(
              'h-3 w-3 translate-y-[-5px] rotate-45',
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
            'absolute -top-3 -right-3 z-10 size-8 rounded-full',
            noBlurGlassHover,
          )}
        >
          <X className="size-4" />
        </Button>
      </div>
    </Marker>
  );
}
