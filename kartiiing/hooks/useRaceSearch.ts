"use client";

import { useMemo, useState } from "react";
import type { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { normalize } from "@/lib/utils";
import { RaceEventView } from "@/lib/generated/prisma";

// helper function to get the season based on the date
function getSeason(date: Date): string {
  const monthName = date.toLocaleString("en-US", { month: "long" });
  if (["December", "January", "February"].includes(monthName)) return "winter";
  if (["March", "April", "May"].includes(monthName)) return "spring";
  if (["June", "July", "August"].includes(monthName)) return "summer";
  return "autumn";
}

export function useRaceSearch(races: RaceEventView[]) {
  const [searchQuery, setSearchQuery] = useState("");

  // format the fetched races data into a grouped structure
  const groupedRaces: RaceEventGrouped[] = useMemo(() => {
    const map = new Map<number, RaceEventGrouped>();

    for (const row of races) {
      const existing = map.get(row.id);

      if (!existing) {
        // if the race event does not exist, create a new one
        map.set(row.id, {
          id: row.id.toString(),
          date: {
            start: row.date_start || null,
            end: row.date_end,
          },
          location: {
            country: {
              name: row.country_name,
              code: row.country_code,
            },
            circuit: {
              id: row.circuit_id,
              name: row.circuit_name,
              nameLong: row.circuit_name_long,
            },
          },
          championship: {
            name: row.championship_name,
            nameLong: row.championship_name_long,
            nameSeries: row.championship_series,
            roundNumber: row.round_number ?? undefined,
            engineTypes: row.engine_type_name ? [row.engine_type_name] : [],
            categories: row.category_name ? [row.category_name] : [],
          },
          resultsLinks: [],
          liveLinks: [],
        });
      } else {
        // if the race event already exists, update it
        const { championship, resultsLinks, liveLinks } = existing;

        // add unique engine type
        if (row.engine_type_name) {
          championship.engineTypes = Array.from(
            new Set([...championship.engineTypes, row.engine_type_name])
          );
        }

        // add unique category
        if (row.category_name) {
          championship.categories = Array.from(
            new Set([...championship.categories, row.category_name])
          );
        }

        // add unique result link
        if (row.result_link_url && row.result_link_category) {
          const alreadyExists = resultsLinks?.some(
            (r) =>
              r.url === row.result_link_url &&
              r.category === row.result_link_category
          );

          if (!alreadyExists) {
            resultsLinks?.push({
              url: row.result_link_url,
              category: row.result_link_category,
            });
          }
        }

        // add unique live link
        if (row.live_link_url && row.live_link_type) {
          const alreadyExists = liveLinks?.some(
            (l) => l.url === row.live_link_url && l.type === row.live_link_type
          );

          if (!alreadyExists) {
            liveLinks?.push({
              url: row.live_link_url,
              type: row.live_link_type,
            });
          }
        }
      }
    }

    return Array.from(map.values());
  }, [races]);

  const filteredRaces: RaceEventGrouped[] = useMemo(() => {
    const normalizedQuery = normalize(searchQuery);
    const queryWords = normalizedQuery.split(" ").filter(Boolean);

    return groupedRaces.filter((entry) => {
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
  }, [groupedRaces, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRaces,
  };
}
