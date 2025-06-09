"use client";

import { useEffect, useState, useMemo } from "react";
import { useRaceSearch } from "@/hooks/useRaceSearch";
import RaceCard from "@/components/calendar/RaceCard";
import Aside from "@/components/Aside";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/Loader";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { toDay } from "@/lib/utils";

export default function CalendarPage() {
  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState<RaceEventGrouped[]>([]);
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

  const upcomingDate: Date | null = useMemo(() => {
    const futureRaces = filteredRaces.filter(
      (r) => toDay(r.date.end) > toDay(new Date())
    );
    if (futureRaces.length === 0) return null;

    const nextRace = futureRaces.reduce((prev, curr) =>
      toDay(prev.date.end) < toDay(curr.date.end) ? prev : curr
    );

    return toDay(nextRace.date.end);
  }, [filteredRaces]);

  return (
    <div className="container flex flex-1 items-stretch justify-between mx-auto lg:mx-0">
      <section className="flex-1 mx-auto lg:px-8 xl:px-4">
        <div className="px-1 sm:px-5 md:px-6 lg:pl-2 lg:pr-8">
          <CalendarHeader races={races} />

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredCount={filteredRaces.length}
          />

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
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Aside position="right" visibilityFrom="xl"></Aside>
    </div>
  );
}
