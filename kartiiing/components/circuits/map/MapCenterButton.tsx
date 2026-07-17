'use client';

import { MapRef } from 'react-map-gl/mapbox';
import { Crosshair } from 'lucide-react';
import { ICoordinates } from '@kartiiing/shared';
import {
  cn,
  flyToCenter,
  lightDarkGlassBase,
  lightDarkGlassOnlyHover,
} from '@/lib/utils';

type Props = {
  mapRef: React.RefObject<MapRef | null>;
  userLocation: ICoordinates | null;
  className?: string;
};

export function MapCenterButton({ mapRef, userLocation, className }: Props) {
  if (!userLocation) return null;

  return (
    <button
      onClick={() => {
        const map = mapRef.current?.getMap();
        if (map) flyToCenter(map, userLocation, 10);
      }}
      className={cn(
        'text-foreground/80 hover:text-foreground flex h-10.5 w-10.5 cursor-pointer items-center justify-center rounded-lg',
        'focus-visible:ring focus-visible:outline-none focus-visible:ring-inset',
        lightDarkGlassBase,
        lightDarkGlassOnlyHover,
        className,
      )}
      aria-label="Center on your location"
    >
      <Crosshair className="size-4.5" />
    </button>
  );
}
