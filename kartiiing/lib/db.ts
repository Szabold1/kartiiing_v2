import dotenv from "dotenv";
import { prisma } from "@/lib/prisma";
import { RaceEventView } from "./generated/prisma";
import { RaceEventGrouped } from "./types/RaceTypes";

dotenv.config();

export async function getRaces(year?: string, sort: "asc" | "desc" = "asc") {
  const yearNum = year ? parseInt(year) : undefined;
  const whereCondition = yearNum
    ? {
        OR: [
          {
            date_start: {
              gte: new Date(`${yearNum}-01-01`),
              lt: new Date(`${+yearNum + 1}-01-01`),
            },
          },
          {
            date_end: {
              gte: new Date(`${yearNum}-01-01`),
              lt: new Date(`${+yearNum + 1}-01-01`),
            },
          },
        ],
      }
    : undefined;

  const races = await prisma.raceEventView.findMany({
    where: whereCondition,
    orderBy: {
      date_start: sort,
    },
  });

  return races;
}

export function groupRaceEvents(races: RaceEventView[]): RaceEventGrouped[] {
  const map = new Map<number, RaceEventGrouped>();

  for (const row of races) {
    const existing = map.get(row.id);

    if (!existing) {
      // if the race event does not exist, create a new one
      map.set(row.id, {
        id: row.id.toString(),
        date: {
          start: row.date_start.toISOString(),
          end: row.date_end.toISOString(),
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
}
