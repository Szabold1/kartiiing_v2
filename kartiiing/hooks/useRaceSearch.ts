"use client";

import { useMemo, useState } from "react";
import type { RaceEvent, RaceCardData } from "@/lib/types/RaceTypes";
import { normalize } from "@/lib/utils";

export function useRaceSearch(races: RaceEvent[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const flattenedRaces: RaceCardData[] = useMemo(() => {
    return races.flatMap((race) =>
      race.championships.map((championship, index) => ({
        id: `${race.id}-${index}`,
        date: race.date,
        location: race.location,
        championship,
      }))
    );
  }, [races]);

  const filteredRaces = useMemo(() => {
    const normalizedQuery = normalize(searchQuery);
    const queryWords = normalizedQuery.split(" ").filter(Boolean);

    return flattenedRaces.filter((entry) => {
      const { championship, location } = entry;

      const startDate = new Date(entry.date.start);
      const monthName = startDate.toLocaleString("en-US", { month: "long" });
      const season = ["December", "January", "February"].includes(monthName)
        ? "winter"
        : ["March", "April", "May"].includes(monthName)
        ? "spring"
        : ["June", "July", "August"].includes(monthName)
        ? "summer"
        : "autumn";

      const fields = [
        normalize(championship.base_name),
        normalize(championship.short_name ?? ""),
        normalize(championship.series_name ?? ""),
        ...championship.engine_types.map((c) => normalize(c)),
        ...championship.categories.map((c) => normalize(c)),
        normalize(location.name),
        normalize(location.circuit.name),
        normalize(location.country.name),
        normalize(monthName),
        normalize(season),
        normalize(season === "autumn" ? "fall" : ""),
      ];

      return queryWords.every((word) =>
        fields.some((field) => field.includes(word))
      );
    });
  }, [flattenedRaces, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRaces,
  };
}
