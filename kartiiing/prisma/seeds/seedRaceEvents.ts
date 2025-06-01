import { PrismaClient } from "@prisma/client";
import { createRaceEvent } from "../helpers";

export async function seedRaceEvents(prisma: PrismaClient) {
  await createRaceEvent(prisma, {
    roundNumber: 1,
    championshipNameShort: "FIA",
    championshipSeries: "European Championship",
    circuitShortName: "Campillos",
    dateEnd: "2025-04-06",
    categoryNames: ["OK", "OK-J"],
  });

  await createRaceEvent(prisma, {
    roundNumber: 2,
    championshipNameShort: "FIA",
    championshipSeries: "European Championship",
    circuitShortName: "Portimão",
    dateEnd: "2025-05-04",
    categoryNames: ["OK", "OK-J"],
  });

  await createRaceEvent(prisma, {
    roundNumber: 1,
    championshipNameShort: "FIA",
    championshipSeries: "Academy Trophy",
    circuitShortName: "Portimão",
    dateEnd: "2025-05-04",
    categoryNames: ["Academy-Senior"],
  });

  await createRaceEvent(prisma, {
    roundNumber: 1,
    championshipNameShort: "FIA",
    championshipSeries: "European Championship",
    circuitShortName: "Valencia",
    dateEnd: "2024-03-24",
    categoryNames: ["OK", "OK-J"],
    resultLinks: [
      {
        url: "https://www.fiakarting.com/event/2024-valencia/OK/results",
        category: "OK",
      },
      {
        url: "https://www.fiakarting.com/event/2024-valencia/OK-Junior/results",
        category: "OK-J",
      },
    ],
  });
}
