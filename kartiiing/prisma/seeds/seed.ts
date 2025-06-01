// seed.ts
import { PrismaClient } from "../../lib/generated/prisma";
import { seedCountries } from "./seedCountries";
import { seedCircuits } from "./seedCircuits";
import { seedEngineTypes } from "./seedEngineTypes";
import { seedCategories } from "./seedCategories";
import { seedChampionships } from "./seedChampionships";
import { seedRaceWeekends } from "./seedRaceWeekends";
import { seedRaceEvents } from "./seedRaceEvents";

const prisma = new PrismaClient();

async function main() {
  await seedCountries(prisma);
  await seedCircuits(prisma);
  await seedEngineTypes(prisma);
  await seedCategories(prisma);
  await seedChampionships(prisma);
  await seedRaceWeekends(prisma);
  await seedRaceEvents(prisma);
}

main()
  .then(() => console.log("Seeding completed successfully."))
  .catch((e) => console.error("Error during seeding:", e))
  .finally(async () => await prisma.$disconnect());
