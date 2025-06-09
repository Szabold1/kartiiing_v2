import { PrismaClient } from "@prisma/client";
import { createRaceEvent } from "../helpers";
import { getAllRaceEvents } from "../data/DataRaceEvents";

export async function seedRaceEvents(prisma: PrismaClient) {
  getAllRaceEvents().forEach(async (r) => {
    await createRaceEvent(prisma, {
      roundNumber: r.roundNumber,
      championshipNameShort: r.championshipNameShort,
      championshipSeries: r.championshipSeries,
      circuitShortName: r.circuitShortName,
      dateEnd: r.dateEnd,
      categoryNames: r.categoryNames,
    });
  });
}
