import { PrismaClient } from "@prisma/client";
import { Category } from "@/lib/generated/prisma";

export async function getCountryByCode(prisma: PrismaClient, code: string) {
  const country = await prisma.country.findFirst({ where: { code } });
  if (!country) {
    throw new Error(`Country with code ${code} not found`);
  }
  return country;
}

export async function getEngineTypeByName(prisma: PrismaClient, name: string) {
  const engineType = await prisma.engineType.findFirst({ where: { name } });
  if (!engineType) {
    throw new Error(`Engine type with name ${name} not found`);
  }
  return engineType;
}

export async function getCircuitByShortName(
  prisma: PrismaClient,
  nameShort: string
) {
  const circuit = await prisma.circuit.findFirst({ where: { nameShort } });
  if (!circuit) {
    throw new Error(`Circuit with nameShort ${nameShort} not found`);
  }
  return circuit;
}

export async function getWeekendByDateCircuit(
  prisma: PrismaClient,
  dateEnd: Date,
  circuitShortName: string
) {
  const weekend = await prisma.raceWeekend.findFirst({
    where: {
      dateEnd,
      circuit: {
        nameShort: circuitShortName,
      },
    },
  });
  if (!weekend) {
    throw new Error(
      `Race weekend not found for date ${dateEnd} and circuit ${circuitShortName}`
    );
  }
  return weekend;
}

export async function getChampionshipByName(
  prisma: PrismaClient,
  nameShort: string,
  nameSeries: string
) {
  const championship = await prisma.championship.findFirst({
    where: {
      nameShort,
      nameSeries,
    },
  });
  if (!championship) {
    throw new Error(
      `Championship not found for nameShort ${nameShort} and nameSeries ${nameSeries}`
    );
  }
  return championship;
}

interface RaceEventData {
  roundNumber: number;
  championshipNameShort: string;
  championshipSeries: string;
  circuitShortName: string;
  dateEnd: string;
  categoryNames: string[];
  resultLinks?: { url: string; category: string }[];
  liveLinks?: { url: string; type: "stream" | "time" }[];
}
export async function createRaceEvent(
  prisma: PrismaClient,
  data: RaceEventData
) {
  const championship = await getChampionshipByName(
    prisma,
    data.championshipNameShort,
    data.championshipSeries
  );

  const weekend = await getWeekendByDateCircuit(
    prisma,
    new Date(data.dateEnd),
    data.circuitShortName
  );

  const categories: Category[] = await prisma.category.findMany({
    where: {
      name: { in: data.categoryNames },
    },
  });

  if (categories.length !== data.categoryNames.length) {
    throw new Error("One or more categories not found");
  }

  await prisma.raceEvent.create({
    data: {
      roundNumber: data.roundNumber,
      championshipId: championship.id,
      raceWeekendId: weekend.id,
      categories: {
        connect: categories.map((cat) => ({ id: cat.id })),
      },
      resultLinks: data.resultLinks
        ? {
            create: data.resultLinks.map((link) => ({
              url: link.url,
              category: link.category,
            })),
          }
        : undefined,
      liveLinks: data.liveLinks
        ? {
            create: data.liveLinks.map((link) => ({
              url: link.url,
              type: link.type,
            })),
          }
        : undefined,
    },
  });
}
