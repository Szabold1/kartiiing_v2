'use client';

import { useEffect, useCallback, useState } from 'react';
import { useSectionWidth } from '@/lib/hooks/useSectionWidth';
import { LIST_VIEW_BREAKPOINT } from '@/lib/constants/layout';
import { SearchHeader } from '@/components/shared/SearchHeader';
import { CalendarActions } from '@/components/calendar/CalendarActions';
import { RacesGrid } from '@/components/calendar/RacesGrid';
import { BackToTopBtn } from '@/components/shared/btns/BackToTopBtn';
import { ErrorState } from '@/components/shared/ErrorState';
import {
  IRaceEvent,
  CalendarOrderPreset,
  IPaginatedResponse,
} from '@kartiiing/shared';
import { getRaceEvents } from '@/lib/api';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';

type Props = {
  initialData: IPaginatedResponse<IRaceEvent>;
  year: string;
  initialSort: CalendarOrderPreset;
  serverError?: string;
};

const PAGE_SIZE = 20;

export function CalendarClient({
  initialData,
  year,
  initialSort,
  serverError,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState<CalendarOrderPreset>(initialSort);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientError, setClientError] = useState<string | null>(null);
  const { sectionRef, sectionWidth } = useSectionWidth();

  const fetchRaces = useCallback(
    (page: number, limit: number) =>
      getRaceEvents({
        year: year === 'all' ? undefined : year.toString(),
        preset,
        search: searchQuery.trim() || undefined,
        page,
        limit,
      }),
    [year, preset, searchQuery],
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
    resetDeps: [searchQuery, preset, year],
  });

  useEffect(() => {
    setClientError(null);

    if (!searchQuery.trim() && preset === initialSort) {
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
        console.error('Error fetching races:', error);
        setClientError(
          'Failed to load races. Check your internet connection and try again.',
        );
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performFetch, 300);
    return () => clearTimeout(debounceTimer);
  }, [
    searchQuery,
    preset,
    fetchRaces,
    reset,
    replaceData,
    initialData,
    initialSort,
  ]);

  function renderCalendarActions(small = false) {
    return (
      <CalendarActions
        preset={preset}
        onPresetChange={setPreset}
        small={small}
      />
    );
  }

  const showGridToggle = sectionWidth >= LIST_VIEW_BREAKPOINT;
  const showSentinel = hasMore && !loading;

  return (
    <>
      <div ref={sectionRef}>
        <div className="mb-2 flex flex-col items-center gap-2 md:flex-row">
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

        <div className="my-4 border-t border-dashed py-4">
          {serverError || clientError ? (
            <ErrorState
              title="Something went wrong"
              message={serverError || clientError || ''}
            />
          ) : (
            <RacesGrid
              races={displayedRaces}
              loading={loading}
              sectionWidth={sectionWidth}
              loadingMore={loadingMore}
              isAllYearsView={year === 'all'}
            />
          )}

          {showSentinel && <div ref={sentinelRef} className="h-2 w-full" />}
        </div>
      </div>

      <BackToTopBtn />
    </>
  );
}
