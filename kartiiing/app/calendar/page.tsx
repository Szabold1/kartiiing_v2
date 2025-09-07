"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
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
} from "@/lib/constants/calendar";
import { AnimatePresence } from "framer-motion";

export default function CalendarPage() {
  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState<RaceEventGrouped[]>([]);
  const [chosenRace, setChosenRace] = useState<RaceEventGrouped | null>(null);
  const { searchQuery, setSearchQuery, filteredRaces } = useRaceSearch(races);
  const { nextRaceDate } = useRaceStatus(filteredRaces);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [viewMode, setViewModeState] = useState<CalendarViewMode>(
    CalendarViewMode.GRID
  );
  const showListView =
    viewMode === CalendarViewMode.LIST && sectionWidth >= 850;

  // persist viewMode in localStorage
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

  // track section width for responsive design
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    function updateWidth() {
      if (sectionRef.current) setSectionWidth(sectionRef.current.offsetWidth);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // fetch races from API
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(
          `/api/races?year=${new Date().getFullYear()}`
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
  }, []);

  return (
    <RaceProvider races={filteredRaces}>
      <div
        ref={sectionRef}
        className="container flex flex-1 items-stretch justify-between mx-auto"
      >
        <section className="flex-1 mx-auto lg:px-8">
          <div className="px-1 sm:px-5 md:px-6 lg:px-2">
            <CalendarHeader races={races} />

            <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
              <SearchHeader
                useRaceSearchData={{
                  searchQuery,
                  setSearchQuery,
                  filteredRaces,
                }}
              >
                {sectionWidth < 768 && nextRaceDate && (
                  <NextRaceBtn races={filteredRaces} />
                )}
              </SearchHeader>
              {sectionWidth >= 768 && (
                <div className="flex items-center gap-2 h-9.5">
                  <GridListViewToggle
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />
                  {nextRaceDate && <NextRaceBtn races={filteredRaces} />}
                </div>
              )}
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
                      ? "flex flex-col gap-3"
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
