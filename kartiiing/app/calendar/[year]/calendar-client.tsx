"use client";

import { useEffect, useCallback, useState } from "react";
import { useSectionWidth } from "@/lib/hooks/useSectionWidth";
import { LIST_VIEW_BREAKPOINT } from "@/lib/constants/layout";
import { SearchHeader } from "@/components/shared/SearchHeader";
import { CalendarActions } from "@/components/calendar/CalendarActions";
import { RacesGrid } from "@/components/calendar/RacesGrid";
import { BackToTopBtn } from "@/components/shared/btns/BackToTopBtn";
import {
  IRaceEvent,
  RaceEventSortOptions,
  IPaginatedResponse,
} from "@kartiiing/shared";
import { getRaceEvents } from "@/lib/api";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";

type Props = {
  initialData: IPaginatedResponse<IRaceEvent>;
  year: string;
  initialSort: RaceEventSortOptions;
};

const PAGE_SIZE = 20;

export function CalendarClient({ initialData, year, initialSort }: Props) {
  const normalizedInitialSort =
    initialSort === RaceEventSortOptions.DESC
      ? RaceEventSortOptions.DESC
      : RaceEventSortOptions.ASC;
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<RaceEventSortOptions>(
    normalizedInitialSort,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { sectionRef, sectionWidth } = useSectionWidth();

  const fetchRaces = useCallback(
    (page: number, limit: number) =>
      getRaceEvents({
        year: year === "all" ? undefined : year.toString(),
        sort: sortOrder,
        search: searchQuery.trim() || undefined,
        page,
        limit,
      }),
    [year, sortOrder, searchQuery],
  );

  const {
    data: displayedRaces,
    totalCount,
    hasMore,
    loadingMore,
    sentinelRef,
    reset,
    replaceData,
  } = useInfiniteScroll<IRaceEvent>({
    fetchFn: fetchRaces,
    initialData,
    pageSize: PAGE_SIZE,
    resetDeps: [searchQuery, sortOrder, year],
  });

  useEffect(() => {
    if (!searchQuery.trim() && sortOrder === normalizedInitialSort) {
      reset();
      return;
    }

    const performFetch = async () => {
      setLoading(true);
      try {
        const response = await fetchRaces(1, PAGE_SIZE);
        replaceData(
          response.data,
          response.meta.totalItems,
          response.meta.hasNextPage,
        );
      } catch (error) {
        console.error("Error fetching races:", error);
        replaceData([], 0, false);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performFetch, 300);
    return () => clearTimeout(debounceTimer);
  }, [
    searchQuery,
    sortOrder,
    fetchRaces,
    reset,
    replaceData,
    initialData,
    normalizedInitialSort,
  ]);

  // Handle sort order change by navigating to new URL
  const handleSortChange = useCallback(() => {
    const newSortOrder =
      sortOrder === RaceEventSortOptions.ASC
        ? RaceEventSortOptions.DESC
        : RaceEventSortOptions.ASC;

    const sortParam =
      newSortOrder === RaceEventSortOptions.DESC ? "desc" : "asc";

    setSortOrder(newSortOrder);

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sort", sortParam);
    window.history.replaceState(
      window.history.state,
      "",
      currentUrl.pathname + currentUrl.search,
    );
  }, [sortOrder]);

  // Render calendar actions (view toggle, sort toggle, next race button)
  function renderCalendarActions(small = false) {
    return (
      <CalendarActions
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        races={displayedRaces}
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
            setSearchQuery={setSearchQuery}
            totalResults={totalCount}
            placeholder="Search... (e.g. kz2 summer)"
          >
            {!showGridToggle && renderCalendarActions(true)}
          </SearchHeader>

          {showGridToggle && renderCalendarActions()}
        </div>

        <div className="my-4 py-4 border-t border-dashed">
          <RacesGrid
            races={displayedRaces}
            loading={loading}
            sectionWidth={sectionWidth}
            loadingMore={loadingMore}
            isAllYearsView={year === "all"}
          />

          {showSentinel && <div ref={sentinelRef} className="h-2 w-full" />}
        </div>
      </div>

      <BackToTopBtn />
    </>
  );
}
