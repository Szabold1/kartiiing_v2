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
        nameSeries: "World Cup",
      },
      {
        nameShort: "FIA",
        nameLong: "FIA Karting",
        nameSeries: "International Masters Super Cup",
      },
      {
        nameShort: "FIA",
        nameLong: "FIA Karting",
        nameSeries: "Academy Trophy",
      },
      {
        nameShort: "WSK",
        nameLong: "WSK",
        nameSeries: "Super Master Series",
      },
      {
        nameShort: "WSK",
        nameLong: "WSK",
        nameSeries: "Euro Series",
      },
      {
        nameShort: "WSK",
        nameLong: "WSK",
        nameSeries: "Final Cup",
      },
      {
        nameShort: "RMC",
        nameLong: "Rotax Max Challenge",
        nameSeries: "Euro Trophy Winter Series",
      },
      {
        nameShort: "RMC",
        nameLong: "Rotax Max Challenge",
        nameSeries: "Euro Trophy",
      },
      {
        nameShort: "RMC",
        nameLong: "Rotax Max Challenge",
        nameSeries: "Switzerland",
      },
      {
        nameShort: "IAME",
        nameLong: "IAME",
        nameSeries: "Winter Cup",
      },
      {
        nameShort: "IAME",
        nameLong: "IAME",
        nameSeries: "Euro Series",
      },
      {
        nameShort: "Vortex",
        nameLong: "Vortex",
        nameSeries: "Rok Winter Trophy",
      },
      {
        nameShort: "Vortex",
        nameLong: "Vortex",
        nameSeries: "Rok Festival",
      },
      {
        nameShort: "Vortex",
        nameLong: "Vortex",
        nameSeries: "Rok Superfinal",
      },
    ],
    skipDuplicates: true,
  });
}
