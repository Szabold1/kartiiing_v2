"use client";

import { useEffect, useState, useMemo } from "react";
import { useRaceSearch } from "@/hooks/useRaceSearch";
import RaceCard from "@/components/calendar/RaceCard";
import Loader from "@/components/Loader";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { getNextUpcomingRaceDate } from "@/lib/utils";
import NextRaceBtn from "@/components/calendar/NextRaceBtn";
import SearchHeader from "@/components/calendar/SearchHeader";
import RaceDetails from "@/components/calendar/RaceDetails";
import Modal from "@/components/Modal";
import { AnimatePresence } from "framer-motion";

export default function CalendarPage() {
  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState<RaceEventGrouped[]>([]);
  const [chosenRace, setChosenRace] = useState<RaceEventGrouped | null>(null);
  const { searchQuery, setSearchQuery, filteredRaces } = useRaceSearch(races);

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

  const upcomingDate: Date | null = useMemo(
    () => getNextUpcomingRaceDate(filteredRaces),
    [filteredRaces]
  );

  return (
    <div className="container flex flex-1 items-stretch justify-between mx-auto">
      <section className="flex-1 mx-auto lg:px-8">
        <div className="px-1 sm:px-5 md:px-6 lg:px-2">
          <CalendarHeader races={races} />

          <SearchHeader
            useRaceSearchData={{ searchQuery, setSearchQuery, filteredRaces }}
          >
            {upcomingDate && <NextRaceBtn races={filteredRaces} />}
          </SearchHeader>

          <div className="my-5 py-5.5 border-t border-dashed">
            {loading ? (
              <Loader />
            ) : filteredRaces.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">
                No results found.
              </p>
            ) : (
              <div className="grid justify-center gap-5 grid-cols-[repeat(auto-fit,minmax(16.9rem,1fr))]">
                {filteredRaces.map((race) => (
                  <RaceCard
                    key={race.id}
                    date={race.date}
                    location={race.location}
                    championship={race.championship}
                    upcomingDate={upcomingDate}
                    onClick={() => setChosenRace(race)}
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
    </div>
  );
}
