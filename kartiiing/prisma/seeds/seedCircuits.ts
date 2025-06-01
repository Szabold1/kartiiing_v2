import { PrismaClient } from "@prisma/client";
import { getCircuitsData } from "../data/dataCircuits";

export async function seedCircuits(prisma: PrismaClient) {
  await prisma.circuit.createMany({
    data: await getCircuitsData(prisma),
    skipDuplicates: true,
  });
}
