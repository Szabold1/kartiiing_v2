"use client";

import { useState, useEffect, useCallback } from "react";
import { useSectionWidth } from "@/lib/hooks/useSectionWidth";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { LIST_VIEW_BREAKPOINT } from "@/lib/constants/layout";
import { SearchHeader } from "@/components/shared/SearchHeader";
import { CircuitsActions } from "@/components/circuits/CircuitsActions";
import { CircuitsGrid } from "@/components/circuits/CircuitsGrid";
import { BackToTopBtn } from "@/components/shared/btns/BackToTopBtn";
import { getCircuits } from "@/lib/api";
import {
  ICircuit,
  ICircuitCoordinate,
  IPaginatedResponse,
} from "@kartiiing/shared";

type Props = {
  initialData: IPaginatedResponse<ICircuit>;
  coordinates: ICircuitCoordinate[];
};

const PAGE_SIZE = 20;

export function CircuitsClient({ initialData, coordinates }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { sectionRef, sectionWidth } = useSectionWidth();

  const fetchCircuits = useCallback(
    (page: number, limit: number) =>
      getCircuits({
        page,
        limit,
        search: searchQuery.trim() || undefined,
      }),
    [searchQuery],
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
    resetDeps: [searchQuery],
  });

  // Server-side search: replace accumulated data with search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      reset();
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      try {
        const response = await getCircuits({
          page: 1,
          limit: PAGE_SIZE,
          search: searchQuery.trim(),
        });
        replaceData(
          response.data,
          response.meta.totalItems,
          response.meta.hasNextPage,
        );
      } catch (error) {
        console.error("Error searching circuits:", error);
        replaceData([], 0, false);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, initialData, reset, replaceData]);

  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  function renderCircuitsActions(small = false) {
    return <CircuitsActions coordinates={coordinates} small={small} />;
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
          <CircuitsGrid
            circuits={displayedCircuits}
            loading={loading}
            sectionWidth={sectionWidth}
            loadingMore={loadingMore}
          />

          {showSentinel && <div ref={sentinelRef} className="h-2 w-full" />}
        </div>
      </div>

      <BackToTopBtn />
    </>
  );
}
