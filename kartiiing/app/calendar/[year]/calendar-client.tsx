"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useRaceSearch } from "@/hooks/useRaceSearch";
import { useRaceStatus } from "@/hooks/useRaceStatus";
import { RaceProvider } from "@/contexts/RaceContext";
import RaceCard from "@/components/calendar/RaceCard";
import Loader from "@/components/Loader";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import NextRaceBtn from "@/components/calendar/NextRaceBtn";
import SearchHeader from "@/components/calendar/SearchHeader";
import GridListViewToggle from "@/components/calendar/GridListViewToggle";
import RaceDetails from "@/components/calendar/RaceDetails";
import Modal from "@/components/Modal";
import BackToTopBtn from "@/components/BackToTopBtn";
import {
  CalendarViewMode,
  CALENDAR_VIEW_MODE_KEY,
  SortOrder,
} from "@/lib/constants/calendar";
import { AnimatePresence } from "framer-motion";
import { lightDarkGlassBase } from "@/lib/classNames";
import SortOrderToggle from "@/components/calendar/SortOrderToggle";

interface Props {
  initialRaces: RaceEventGrouped[];
  year: string;
  initialSort: "asc" | "desc";
}

export default function CalendarClient({
  initialRaces,
  year,
  initialSort,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [races, setRaces] = useState<RaceEventGrouped[]>(initialRaces);
  const [chosenRace, setChosenRace] = useState<RaceEventGrouped | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | string>(year);
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    initialSort === "desc" ? SortOrder.DESC : SortOrder.ASC
  );
  const { searchQuery, setSearchQuery, filteredRaces } = useRaceSearch(races);
  const { nextRaceDate } = useRaceStatus(filteredRaces);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [viewMode, setViewModeState] = useState<CalendarViewMode>(
    CalendarViewMode.GRID
  );
  const showListView =
    viewMode === CalendarViewMode.LIST && sectionWidth >= 850;

  // Update races and selectedYear when year prop changes
  useEffect(() => {
    setRaces(initialRaces);
    setSelectedYear(year);
  }, [initialRaces, year]);

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
          sortOrder === SortOrder.DESC ? "desc" : "asc"
        }`
      );
    }
  };

  // Handle sort order change by navigating to new URL
  const handleSortChange = () => {
    const newSortOrder =
      sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    const sortParam = newSortOrder === SortOrder.DESC ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sort", sortParam);
    router.replace(currentUrl.pathname + currentUrl.search);
  };

  // Fetch races from API when sortOrder changes (but not year, as that's handled by navigation)
  useEffect(() => {
    if (sortOrder === (initialSort === "desc" ? SortOrder.DESC : SortOrder.ASC))
      return;

    setLoading(true);
    const fetchRaces = async () => {
      try {
        const sortParam = sortOrder === SortOrder.DESC ? "desc" : "asc";
        const response = await fetch(
          `/api/races?year=${selectedYear}&sort=${sortParam}`
        );
        if (!response.ok) throw new Error("Failed to fetch races");
        const data: RaceEventGrouped[] = await response.json();
        setRaces(data);
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
          {nextRaceDate && <NextRaceBtn races={filteredRaces} />}
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
    <RaceProvider races={filteredRaces}>
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
            />

            <div className="flex flex-col md:flex-row gap-2 mb-2 items-center">
              <SearchHeader
                useRaceSearchData={{
                  searchQuery,
                  setSearchQuery,
                  filteredRaces,
                }}
              >
                {sectionWidth < 768 && renderCalendarActions(true)}
              </SearchHeader>

              {sectionWidth >= 768 && renderCalendarActions()}
            </div>

            <div className="my-5 py-5.5 border-t border-dashed">
              {loading ? (
                <Loader />
              ) : filteredRaces.length === 0 ? (
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
                  {filteredRaces.map((race) => (
                    <RaceCard
                      key={race.id}
                      race={race}
                      onClick={() => setChosenRace(race)}
                      variant={showListView ? "row" : "card"}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {chosenRace && (
            <Modal onClose={() => setChosenRace(null)}>
              <RaceDetails
                race={chosenRace}
                onClose={() => setChosenRace(null)}
              />
            </Modal>
          )}
        </AnimatePresence>

        <BackToTopBtn />
      </div>
    </RaceProvider>
  );
}
