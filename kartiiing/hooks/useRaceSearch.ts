"use client";

import { useMemo, useState } from "react";
import type { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { normalize } from "@/lib/utils";

// helper function to get the season based on the date
function getSeason(date: Date): string {
  const monthName = date.toLocaleString("en-US", { month: "long" });
  if (["December", "January", "February"].includes(monthName)) return "winter";
  if (["March", "April", "May"].includes(monthName)) return "spring";
  if (["June", "July", "August"].includes(monthName)) return "summer";
  return "autumn";
}

export function useRaceSearch(races: RaceEventGrouped[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRaces: RaceEventGrouped[] = useMemo(() => {
    const normalizedQuery = normalize(searchQuery);
    const queryWords = normalizedQuery.split(" ").filter(Boolean);

    return races.filter((entry) => {
      const { championship, location } = entry;
      const dateStart = entry.date.start ? new Date(entry.date.start) : null;
      const dateEnd = new Date(entry.date.end);

      // seasons from start and end
      const seasonsSet = new Set<string>();
      if (dateStart) seasonsSet.add(getSeason(dateStart));
      if (dateEnd) seasonsSet.add(getSeason(dateEnd));
      const seasons = Array.from(seasonsSet);
      if (seasons.includes("autumn")) seasons.push("fall");

      // months from start and end
      const monthsSet = new Set<string>();
      if (dateStart)
        monthsSet.add(
          new Date(dateStart).toLocaleString("en-US", { month: "long" })
        );
      if (dateEnd)
        monthsSet.add(
          new Date(dateEnd).toLocaleString("en-US", { month: "long" })
        );
      const months = Array.from(monthsSet);

      // normalized searchable fields
      const fields = [
        normalize(championship.name),
        normalize(championship.nameLong ?? ""),
        normalize(championship.nameSeries ?? ""),
        ...championship.engineTypes.map((c) => normalize(c)),
        ...championship.categories.map((c) => normalize(c)),
        normalize(location.circuit.name),
        normalize(location.circuit.name),
        normalize(location.country.name),
        ...seasons.map((s) => normalize(s)),
        ...months.map((m) => normalize(m)),
      ];

      // all query words must appear in at least one field
      return queryWords.every((word) =>
        fields.some((field) => field.includes(word))
      );
    });
  }, [searchQuery, races]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRaces,
  };
}
