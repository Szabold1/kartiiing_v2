import { getCircuitByShortName } from "@/prisma/helpers";
import { prisma } from "@/lib/prisma";

export async function get2024RaceWeekends() {
  const valencia = await getCircuitByShortName(prisma, "Valencia");

  return [
    {
      circuitId: valencia.id,
      dateStart: new Date("2024-03-21"),
      dateEnd: new Date("2024-03-24"),
    },
  ];
}
