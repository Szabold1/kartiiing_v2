"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { IPaginatedResponse } from "@kartiiing/shared";

interface UseInfiniteScrollOptions<T> {
  /** Function that fetches a page of data. Receives page number (1-based) and page size. */
  fetchFn: (page: number, pageSize: number) => Promise<IPaginatedResponse<T>>;
  /** The initial data returned from the server (page 1). */
  initialData: IPaginatedResponse<T>;
  /** Number of items per page. Defaults to 20. */
  pageSize?: number;
  /**
   * When these dependencies change, the hook resets to `initialData` and
   * stops loading more (e.g. when a search query changes). Pass as array
   * of primitive values or stable references.
   */
  resetDeps?: unknown[];
}

interface UseInfiniteScrollResult<T> {
  /** All items accumulated so far. */
  data: T[];
  /** Total number of items across all pages. */
  totalCount: number;
  /** Whether there are more pages to load. */
  hasMore: boolean;
  /** Whether a page fetch is currently in progress. */
  loadingMore: boolean;
  /** Ref object to attach to a sentinel element at the bottom of the list. */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  /** Reset to the initial state (e.g. after search or filter change). */
  reset: () => void;
  /**
   * Replace all accumulated data with new data (e.g. after a search).
   * Resets page to 1 and sets hasMore based on the response meta.
   */
  replaceData: (newData: T[], total: number, hasMorePages: boolean) => void;
}

const DEFAULT_PAGE_SIZE = 20;

export function useInfiniteScroll<T>({
  fetchFn,
  initialData,
  pageSize = DEFAULT_PAGE_SIZE,
  resetDeps = [],
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollResult<T> {
  const [data, setData] = useState<T[]>(initialData.data);
  const [totalCount, setTotalCount] = useState(initialData.meta.totalItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialData.meta.hasNextPage);
  const [loadingMore, setLoadingMore] = useState(false);
  // Counter incremented on every data replacement to force observer re-attachment.
  // Fixes the case where a search re-renders the sentinel DOM node but hasMore
  // stays true, so the observer never re-wires to the new element.
  const [sentinelKey, setSentinelKey] = useState(0);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  // Track the current page so the observer closure always has the latest value
  const pageRef = useRef(page);
  pageRef.current = page;

  const hasMoreRef = useRef(hasMore);
  hasMoreRef.current = hasMore;

  const loadingMoreRef = useRef(loadingMore);
  loadingMoreRef.current = loadingMore;

  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  const pageSizeRef = useRef(pageSize);
  pageSizeRef.current = pageSize;

  // Callback to revert to the initial server-rendered data.
  // Re-created whenever resetDeps change; the consumer must call it
  // explicitly (e.g. in a useEffect when all filters are cleared).
  const reset = useCallback(() => {
    setData(initialData.data);
    setTotalCount(initialData.meta.totalItems);
    setPage(1);
    setHasMore(initialData.meta.hasNextPage);
    setLoadingMore(false);
    setSentinelKey((prev) => prev + 1);
    // resetDeps intentionally controls when reset re-creates; adding initialData would break the pattern
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetDeps);

  // Replace accumulated data with fresh results from a client-side
  // search or filter. Call this in a useEffect when search/sort changes
  // to swap in new data while preserving infinite scroll for subsequent pages.
  const replaceData = useCallback(
    (newData: T[], total: number, hasMorePages: boolean) => {
      setData(newData);
      setTotalCount(total);
      setPage(1);
      setHasMore(hasMorePages);
      setLoadingMore(false);
      setSentinelKey((prev) => prev + 1);
    },
    [],
  );

  // Infinite scroll: load more when sentinel enters viewport.
  // Depends on hasMore (to disconnect when no more pages) and sentinelKey
  // (to re-attach after data replacement even when hasMore stays true).
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (
          entry.isIntersecting &&
          hasMoreRef.current &&
          !loadingMoreRef.current
        ) {
          setLoadingMore(true);
          const nextPage = pageRef.current + 1;

          (async () => {
            try {
              const response = await fetchFnRef.current(
                nextPage,
                pageSizeRef.current,
              );
              setData((prev) => [...prev, ...response.data]);
              setTotalCount(response.meta.totalItems);
              setPage(nextPage);
              setHasMore(response.meta.hasNextPage);
            } catch (error) {
              console.error("Error loading more items:", error);
            } finally {
              setLoadingMore(false);
            }
          })();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, sentinelKey]);

  return {
    data,
    totalCount,
    hasMore,
    loadingMore,
    sentinelRef,
    reset,
    replaceData,
  };
}
