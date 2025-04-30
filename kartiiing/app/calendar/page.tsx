"use client";

import { useEffect, useState } from "react";
import { RaceEvent, RaceCardData } from "@/lib/types/RaceTypes";
import { useRaceSearch } from "@/hooks/useRaceSearch";
import PageHeader from "@/components/PageHeader";
import Aside from "@/components/Aside";
import SearchBar from "@/components/SearchBar";

const currentYear = new Date().getFullYear();

function buildCalendarDescription(raceCards: RaceCardData[]): string {
  const uniqueCircuits = Array.from(
    new Set(raceCards.map((r) => r.location.circuit.id))
  ).length;

  const uniqueChampionships = Array.from(
    new Set(
      raceCards.map(
        (r) =>
          `${r.championship.short_name ?? r.championship.base_name} ${
            r.championship.series_name ?? ""
          }`
      )
    )
  ).length;

  return `Discover our ${currentYear} karting calendar, featuring ${raceCards.length} races across ${uniqueCircuits} circuits, representing ${uniqueChampionships} championships.`;
}

export default function CalendarPage() {
  const [races, setRaces] = useState<RaceEvent[]>([]);

  const { searchQuery, setSearchQuery, filteredRaces } = useRaceSearch(races);

  // fetch races from API
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/races?year=${currentYear}`
        );
        if (!response.ok) throw new Error("Failed to fetch races");

        const data: RaceEvent[] = await response.json();
        setRaces(data);
      } catch (error) {
        console.error("Error loading races:", error);
      }
    };

    fetchRaces();
  }, []);

  return (
    <div className="container flex flex-1 items-stretch justify-between mx-auto lg:mx-0">
      <section className="flex-1 mx-auto lg:px-8 xl:px-4">
        <div className="px-1 sm:px-5 md:px-6 lg:pl-2 lg:pr-8">
          <PageHeader
            title="Calendar"
            description={buildCalendarDescription(filteredRaces)}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredCount={filteredRaces.length}
          />
        </div>
      </section>

      <Aside position="right" visibilityFrom="xl"></Aside>
    </div>
  );
}
