import { PrismaClient } from "@prisma/client";
import { getAllRaceWeekends } from "@/prisma/data/dataRaceWeekends";

export async function seedRaceWeekends(prisma: PrismaClient) {
  await prisma.raceWeekend.createMany({
    data: [...(await getAllRaceWeekends())],
    skipDuplicates: true,
  });
}
