import { PrismaClient } from "@prisma/client";

export async function seedEngineTypes(prisma: PrismaClient) {
  await prisma.engineType.createMany({
    data: [
      { name: "Rotax" },
      { name: "IAME" },
      { name: "OK" },
      { name: "KZ" },
      { name: "Mini 60" },
      { name: "Vortex" },
      { name: "Academy" },
    ],
    skipDuplicates: true,
  });
}
