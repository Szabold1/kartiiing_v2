"use client";

import { useEffect, useState, useMemo } from "react";
import { useRaceSearch } from "@/hooks/useRaceSearch";
import RaceCard from "@/components/calendar/RaceCard";
import Aside from "@/components/Aside";
import SearchBar from "@/components/SearchBar";
import { RaceEventView } from "@/lib/generated/prisma";
import CalendarHeader from "@/components/calendar/CalendarHeader";

export default function CalendarPage() {
  const [races, setRaces] = useState<RaceEventView[]>([]);

  const { searchQuery, setSearchQuery, filteredRaces } = useRaceSearch(races);

  // fetch races from API
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(
          `/api/races?year=${new Date().getFullYear()}`
        );
        if (!response.ok) throw new Error("Failed to fetch races");

        const data: RaceEventView[] = await response.json();
        setRaces(data);
      } catch (error) {
        console.error("Error loading races:", error);
      }
    };

    fetchRaces();
  }, []);

  const upcomingDate: Date | null = useMemo(() => {
    const futureRaces = filteredRaces.filter((r) => r.date.end > new Date());
    if (futureRaces.length === 0) return null;

    const nextRace = futureRaces.reduce((prev, curr) =>
      prev.date.end < curr.date.end ? prev : curr
    );

    return nextRace.date.end;
  }, [filteredRaces]);

  return (
    <div className="container flex flex-1 items-stretch justify-between mx-auto lg:mx-0">
      <section className="flex-1 mx-auto lg:px-8 xl:px-4">
        <div className="px-1 sm:px-5 md:px-6 lg:pl-2 lg:pr-8">
          <CalendarHeader filteredRaces={filteredRaces} />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredCount={filteredRaces.length}
          />

          <div className="my-5 py-5.5 border-t border-dashed">
            {filteredRaces.length === 0 ? (
              <p className="text-muted-foreground text-center">
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
