"use client";

import { useRef, useEffect, useCallback } from "react";
import { ICircuit, ICircuitCoordinate } from "@kartiiing/shared";
import { useTheme } from "next-themes";
import mapboxgl from "mapbox-gl";
import Map, { Marker, MapRef } from "react-map-gl/mapbox";
import CircuitMapPopup from "./CircuitMapPopup";
import MapZoomControl from "./MapZoomControl";
import { cn, lightDarkGlassBase } from "@/lib/utils";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  coordinates: ICircuitCoordinate[];
  selectedCircuit: ICircuit | null;

  onCircuitSelect: (id: number) => void;
  onPopupClose: () => void;
  className?: string;
  initialCenter: { longitude: number; latitude: number } | null;
};

export default function CircuitsMap({
  coordinates,
  selectedCircuit,
  onCircuitSelect,
  onPopupClose,
  className = "",
  initialCenter = { longitude: 10.50584, latitude: 45.425175 }, // Lonato
}: Props) {
  const mapRef = useRef<MapRef>(null);
  const { resolvedTheme } = useTheme();
  const mapLoadedRef = useRef(false);

  // Set Standard style light preset based on theme
  const applyLightPreset = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const preset = resolvedTheme === "dark" ? "night" : "day";
    map.setConfigProperty("basemap", "lightPreset", preset);
  }, [resolvedTheme]);

  // On load: apply light preset + position the map
  const handleLoad = useCallback(() => {
    mapLoadedRef.current = true;
    applyLightPreset();

    const map = mapRef.current?.getMap();
    if (!map) return;

    if (initialCenter) {
      map.flyTo({
        center: [initialCenter.longitude, initialCenter.latitude],
        zoom: 4,
        duration: 1500,
        essential: true,
      });
    }
  }, [applyLightPreset, initialCenter]);

  // Re-apply light preset when theme changes
  useEffect(() => {
    if (!mapLoadedRef.current) return;
    applyLightPreset();
  }, [applyLightPreset]);

  // Fit bounds when coordinates change (search filter) — only after initial positioning is done
  useEffect(() => {
    if (!mapLoadedRef.current) return;
    if (!initialCenter) return;

    const map = mapRef.current?.getMap();
    if (!map) return;

    const bounds = new mapboxgl.LngLatBounds();
    coordinates.forEach((coord) => {
      bounds.extend([coord.coordinates.longitude, coord.coordinates.latitude]);
    });

    map.fitBounds(bounds, {
      padding: 100,
      maxZoom: 11,
      duration: 800,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  // Close popup when coordinates change (search filters)
  useEffect(() => {
    onPopupClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  if (!coordinates.length) return null;

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[28rem] rounded-[1.3rem] overflow-hidden",
        lightDarkGlassBase,
        className,
      )}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/standard"
        onLoad={handleLoad}
        onClick={onPopupClose}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
        mapLib={import("mapbox-gl")}
        tabIndex={-1}
      >
        <MapZoomControl
          mapRef={mapRef}
          className="absolute top-17 right-4 z-10"
        />

        {coordinates.map((coord) => (
          <Marker
            key={coord.id}
            longitude={coord.coordinates.longitude}
            latitude={coord.coordinates.latitude}
            anchor="center"
            onClick={(e: mapboxgl.MapMouseEvent) => {
              e.originalEvent.stopPropagation();
              onCircuitSelect(coord.id);
            }}
          >
            <div className="group cursor-pointer">
              <div className="w-6 h-6 bg-foreground/80 dark:bg-foreground/70 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <div className="w-2.5 h-2.5 bg-background rounded-full" />
              </div>
            </div>
          </Marker>
        ))}

        {selectedCircuit && (
          <CircuitMapPopup circuit={selectedCircuit} onClose={onPopupClose} />
        )}
      </Map>
    </div>
  );
}
