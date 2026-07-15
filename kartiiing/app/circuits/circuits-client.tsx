"use client";

import { useState, useEffect, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { useSectionWidth } from "@/lib/hooks/useSectionWidth";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { useUserLocationStore } from "@/lib/stores/userLocationStore";
import { LIST_VIEW_BREAKPOINT } from "@/lib/constants/layout";
import { SearchHeader } from "@/components/shared/SearchHeader";
import { CircuitsActions } from "@/components/circuits/CircuitsActions";
import { CircuitsGrid } from "@/components/circuits/CircuitsGrid";
import { BackToTopBtn } from "@/components/shared/btns/BackToTopBtn";
import { ErrorState } from "@/components/shared/ErrorState";
import { getCircuits } from "@/lib/api";
import {
  ICircuit,
  ICircuitCoordinate,
  IPaginatedResponse,
  CircuitsOrderPreset,
} from "@kartiiing/shared";

type Props = {
  initialData: IPaginatedResponse<ICircuit>;
  coordinates: ICircuitCoordinate[];
  serverError?: string;
};

const PAGE_SIZE = 20;

const DISTANCE_PRESETS = [
  CircuitsOrderPreset.DISTANCE_ASC,
  CircuitsOrderPreset.DISTANCE_DESC,
];

export function CircuitsClient({
  initialData,
  coordinates,
  serverError,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const [preset, setPreset] = useState<CircuitsOrderPreset>(
    CircuitsOrderPreset.LOCATION_ASC,
  );

  const { userLocation, locationUnavailable, initializeLocation } =
    useUserLocationStore(
      useShallow((s) => ({
        userLocation: s.userLocation,
        locationUnavailable: s.locationUnavailable,
        initializeLocation: s.initialize,
      })),
    );

  const { sectionRef, sectionWidth } = useSectionWidth();

  // Resolve user location once on mount for distance presets
  useEffect(() => {
    initializeLocation();
  }, [initializeLocation]);

  const fetchCircuits = useCallback(
    (page: number, limit: number) =>
      getCircuits({
        page,
        limit,
        search: searchQuery.trim() || undefined,
        preset,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
      }),
    [searchQuery, preset, userLocation],
  );

  const {
    data: displayedCircuits,
    totalCount,
    hasMore,
    loadingMore,
    sentinelRef,
    reset,
    replaceData,
  } = useInfiniteScroll<ICircuit>({
    fetchFn: fetchCircuits,
    initialData,
    pageSize: PAGE_SIZE,
    resetDeps: [searchQuery, preset, userLocation],
  });

  // Server-side search and preset changes: replace accumulated data
  useEffect(() => {
    setClientError(null);

    if (!searchQuery.trim() && preset === CircuitsOrderPreset.LOCATION_ASC) {
      reset();
      return;
    }

    const performFetch = async () => {
      setLoading(true);
      try {
        const response = await fetchCircuits(1, PAGE_SIZE);
        replaceData(
          response.data,
          response.meta.totalItems,
          response.meta.hasNextPage,
        );
      } catch (error) {
        console.error("Error fetching circuits:", error);
        setClientError(
          "Failed to load circuits. Check your internet connection and try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performFetch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, preset, userLocation, fetchCircuits, reset, replaceData]);

  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handlePresetChange = useCallback(
    (newPreset: CircuitsOrderPreset) => {
      if (!userLocation && DISTANCE_PRESETS.includes(newPreset)) {
        return;
      }
      setPreset(newPreset);
    },
    [userLocation],
  );

  function renderCircuitsActions(small = false) {
    return (
      <CircuitsActions
        coordinates={coordinates}
        preset={preset}
        onPresetChange={handlePresetChange}
        locationUnavailable={locationUnavailable}
        small={small}
      />
    );
  }

  const showGridToggle = sectionWidth >= LIST_VIEW_BREAKPOINT;
  const showSentinel = hasMore && !loading;

  return (
    <>
      <div ref={sectionRef}>
        <div className="flex flex-col md:flex-row gap-2 mb-2 items-center">
          <SearchHeader
            searchQuery={searchQuery}
            setSearchQuery={handleSearchQueryChange}
            totalResults={totalCount}
            placeholder="Search... (e.g. Italy)"
          >
            {!showGridToggle && renderCircuitsActions(true)}
          </SearchHeader>

          {showGridToggle && renderCircuitsActions()}
        </div>

        <div className="my-4 py-4 border-t border-dashed">
          {serverError || clientError ? (
            <ErrorState
              title="Something went wrong"
              message={serverError || clientError || ""}
            />
          ) : (
            <CircuitsGrid
              circuits={displayedCircuits}
              loading={loading}
              sectionWidth={sectionWidth}
              loadingMore={loadingMore}
            />
          )}

          {showSentinel && <div ref={sentinelRef} className="h-2 w-full" />}
        </div>
      </div>

      <BackToTopBtn />
    </>
  );
}
