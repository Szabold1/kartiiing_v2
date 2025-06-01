import { PrismaClient } from "@prisma/client";
import { getCircuitByShortName } from "../helpers";

export async function seedRaceWeekends(prisma: PrismaClient) {
  const campillos = await getCircuitByShortName(prisma, "Campillos");
  const portimao = await getCircuitByShortName(prisma, "Portimão");
  const valencia = await getCircuitByShortName(prisma, "Valencia");

  await prisma.raceWeekend.createMany({
    data: [
      {
        circuitId: campillos.id,
        dateStart: new Date("2025-04-03"),
        dateEnd: new Date("2025-04-06"),
      },
      {
        circuitId: portimao.id,
        dateStart: new Date("2025-05-01"),
        dateEnd: new Date("2025-05-04"),
      },
      {
        circuitId: valencia.id,
        dateStart: new Date("2025-05-15"),
        dateEnd: new Date("2025-05-18"),
      },
      {
        circuitId: valencia.id,
        dateStart: new Date("2024-03-21"),
        dateEnd: new Date("2024-03-24"),
      },
    ],
    skipDuplicates: true,
  });
}
