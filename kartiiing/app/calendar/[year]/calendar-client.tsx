"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import RaceCard from "@/components/calendar/RaceCard";
import Loader from "@/components/Loader";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import NextRaceBtn from "@/components/calendar/NextRaceBtn";
import SearchHeader from "@/components/calendar/SearchHeader";
import GridListViewToggle from "@/components/calendar/GridListViewToggle";
import BackToTopBtn from "@/components/BackToTopBtn";
import RaceSheet from "@/components/calendar/RaceSheet";
import {
  CalendarViewMode,
  CALENDAR_VIEW_MODE_KEY,
} from "@/lib/constants/calendar";
import { lightDarkGlassBase } from "@/lib/classNames";
import SortOrderToggle from "@/components/calendar/SortOrderToggle";
import {
  IRaceEvent,
  RaceEventSortOptions,
  RaceStatus,
} from "@kartiiing/shared-types";
import { getRaceEvents } from "@/lib/api";

interface Props {
  initialRaces: IRaceEvent[];
  year: string;
  initialSort: RaceEventSortOptions;
  years: number[];
}

export default function CalendarClient({
  initialRaces,
  year,
  initialSort,
  years,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [races, setRaces] = useState<IRaceEvent[]>(initialRaces);
  const [selectedYear, setSelectedYear] = useState<number | string>(year);
  const [sortOrder, setSortOrder] = useState<RaceEventSortOptions>(
    initialSort === RaceEventSortOptions.DESC
      ? RaceEventSortOptions.DESC
      : RaceEventSortOptions.ASC,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [viewMode, setViewModeState] = useState<CalendarViewMode>(
    CalendarViewMode.GRID,
  );
  const showListView =
    viewMode === CalendarViewMode.LIST && sectionWidth >= 850;
  const hasLiveOrNextRace = races.some(
    (r) => r.status === RaceStatus.LIVE || r.status === RaceStatus.UPNEXT,
  );

  // Update races and selectedYear when year prop changes
  useEffect(() => {
    setRaces(initialRaces);
    setSelectedYear(year);
  }, [initialRaces, year]);

  // Handle search by calling API with search parameter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setRaces(initialRaces);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      try {
        const response = await getRaceEvents(
          selectedYear === "all" ? undefined : selectedYear.toString(),
          sortOrder,
          searchQuery.trim(),
        );
        setRaces(response.data);
      } catch (error) {
        console.error("Error searching races:", error);
        setRaces([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, initialRaces, sortOrder, selectedYear]);

  // Persist viewMode in localStorage
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem(CALENDAR_VIEW_MODE_KEY)
        : null;
    if (saved === CalendarViewMode.GRID || saved === CalendarViewMode.LIST) {
      setViewModeState(saved as CalendarViewMode);
    }
  }, []);

  const setViewMode = (mode: CalendarViewMode) => {
    setViewModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem(CALENDAR_VIEW_MODE_KEY, mode);
    }
  };

  // Track section width for responsive design
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    function updateWidth() {
      if (sectionRef.current) setSectionWidth(sectionRef.current.offsetWidth);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Handle year change by navigating to new route
  const handleYearChange = (newYear: string | number) => {
    const yearString = newYear.toString();
    if (yearString !== selectedYear.toString()) {
      setLoading(true);
      router.push(
        `/calendar/${yearString}?sort=${
          sortOrder === RaceEventSortOptions.DESC ? "desc" : "asc"
        }`,
      );
    }
  };

  // Handle sort order change by navigating to new URL
  const handleSortChange = () => {
    const newSortOrder =
      sortOrder === RaceEventSortOptions.ASC
        ? RaceEventSortOptions.DESC
        : RaceEventSortOptions.ASC;
    const sortParam =
      newSortOrder === RaceEventSortOptions.DESC ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sort", sortParam);
    router.replace(currentUrl.pathname + currentUrl.search);
  };

  // Fetch races from API when sortOrder changes (but not year, as that's handled by navigation)
  useEffect(() => {
    if (
      sortOrder ===
      (initialSort === RaceEventSortOptions.DESC
        ? RaceEventSortOptions.DESC
        : RaceEventSortOptions.ASC)
    )
      return;

    setLoading(true);
    const fetchRaces = async () => {
      try {
        const response = await getRaceEvents(
          selectedYear === "all" ? undefined : selectedYear.toString(),
          sortOrder,
        );
        setRaces(response.data);
      } catch (error) {
        console.error("Error loading races:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRaces();
  }, [sortOrder, selectedYear, initialSort]);

  // Render calendar actions (view toggle, sort toggle, next race button)
  function renderCalendarActions(small = false) {
    const alwaysDisplay = () => {
      return (
        <>
          <SortOrderToggle sortOrder={sortOrder} onToggle={handleSortChange} />
          {hasLiveOrNextRace && <NextRaceBtn races={races} />}
        </>
      );
    };

    if (small) {
      return <div className="flex items-center gap-2">{alwaysDisplay()}</div>;
    }

    return (
      <div className={`flex items-center gap-2 ${small ? "h-8" : "h-9.5"}`}>
        <GridListViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        {alwaysDisplay()}
      </div>
    );
  }

  return (
    <>
      <div
        ref={sectionRef}
        className="container flex flex-1 items-stretch justify-between mx-auto"
      >
        <section className="flex-1 mx-auto lg:px-8">
          <div className="px-1 sm:px-5 md:px-6 lg:px-2">
            <CalendarHeader
              races={races}
              selectedYear={selectedYear}
              setSelectedYear={handleYearChange}
              years={years}
            />

            <div className="flex flex-col md:flex-row gap-2 mb-2 items-center">
              <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                races={races}
              >
                {sectionWidth < 768 && renderCalendarActions(true)}
              </SearchHeader>

              {sectionWidth >= 768 && renderCalendarActions()}
            </div>

            <div className="my-4 py-4 border-t border-dashed">
              {loading ? (
                <Loader />
              ) : races.length === 0 ? (
                <p className="text-muted-foreground text-center py-10">
                  No results found.
                </p>
              ) : (
                <div
                  className={`${
                    showListView
                      ? `flex flex-col ${lightDarkGlassBase} p-1.5 rounded-[1.1rem] dark:bg-neutral-900`
                      : "grid justify-center gap-5 grid-cols-[repeat(auto-fit,minmax(16.9rem,1fr))]"
                  }`}
                >
                  {races.map((race) => (
                    <RaceCard
                      key={race.id}
                      race={race}
                      variant={showListView ? "row" : "card"}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <BackToTopBtn />
        <RaceSheet />
      </div>
    </>
  );
}
