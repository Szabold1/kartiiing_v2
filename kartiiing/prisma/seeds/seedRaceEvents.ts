import { PrismaClient } from "@prisma/client";
import { createRaceEvent } from "../helpers";
import { getAllRaceEvents } from "../data/DataRaceEvents";

export async function seedRaceEvents(prisma: PrismaClient) {
  const allRaceEvents = getAllRaceEvents();

  for (const r of allRaceEvents) {
    await createRaceEvent(prisma, {
      roundNumber: r.roundNumber,
      championshipNameShort: r.championshipNameShort,
      championshipSeries: r.championshipSeries,
      circuitShortName: r.circuitShortName,
      dateEnd: r.dateEnd,
      categoryNames: r.categoryNames,
      resultLinks: r.resultLinks,
    });
  }
}
