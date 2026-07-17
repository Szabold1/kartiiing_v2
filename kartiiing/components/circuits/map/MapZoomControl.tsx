'use client';

import { MapRef } from 'react-map-gl/mapbox';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { lightDarkGlassBase, lightDarkGlassOnlyHover } from '@/lib/utils';

type Props = {
  mapRef: React.RefObject<MapRef | null>;
  className?: string;
};

export function MapZoomControl({ mapRef, className }: Props) {
  const handleZoomIn = () => {
    mapRef.current?.getMap()?.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    mapRef.current?.getMap()?.zoomOut({ duration: 300 });
  };

  const buttonClasses = cn(
    'text-foreground/80 hover:text-foreground flex h-10.5 w-10.5 cursor-pointer items-center justify-center',
    'focus-visible:ring focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
    lightDarkGlassOnlyHover,
  );

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg',
        lightDarkGlassBase,
        className,
      )}
    >
      <button
        onClick={handleZoomIn}
        className={cn(buttonClasses, 'rounded-t-lg')}
        aria-label="Zoom in"
      >
        <Plus className="size-4.5" />
      </button>
      <div className="bg-border/60 h-px" />
      <button
        onClick={handleZoomOut}
        className={cn(buttonClasses, 'rounded-b-lg')}
        aria-label="Zoom out"
      >
        <Minus className="size-4.5" />
      </button>
    </div>
  );
}
