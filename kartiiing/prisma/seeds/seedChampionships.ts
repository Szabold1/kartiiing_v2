import { PrismaClient } from "@prisma/client";

export async function seedChampionships(prisma: PrismaClient) {
  await prisma.championship.createMany({
    data: [
      {
        nameShort: "COTF",
        nameLong: "Champions of the Future",
        nameSeries: "Euro Series",
      },
      {
        nameShort: "FIA",
        nameLong: "FIA Karting",
        nameSeries: "European Championship",
      },
      {
        nameShort: "FIA",
        nameLong: "FIA Karting",
        nameSeries: "World Championship",
      },
      {
        nameShort: "FIA",
        nameLong: "FIA Karting",
        nameSeries: "Academy Trophy",
      },
      {
        nameShort: "RMC",
        nameLong: "Rotax Max Challenge",
        nameSeries: "Euro Tropy Winter Series",
      },
      {
        nameShort: "RMC",
        nameLong: "Rotax Max Challenge",
        nameSeries: "Euro Trophy",
      },
    ],
    skipDuplicates: true,
  });
}
