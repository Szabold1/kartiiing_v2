import { PrismaClient } from "@prisma/client";
import { getEngineTypeByName } from "../helpers";

export async function seedCategories(prisma: PrismaClient) {
  const rotax = await getEngineTypeByName(prisma, "Rotax");
  const iame = await getEngineTypeByName(prisma, "IAME");
  const ok = await getEngineTypeByName(prisma, "OK");
  const kz = await getEngineTypeByName(prisma, "KZ");
  const academy = await getEngineTypeByName(prisma, "Academy");

  await prisma.category.createMany({
    data: [
      { name: "Micro", engineTypeId: rotax.id },
      { name: "Mini", engineTypeId: rotax.id },
      { name: "Junior", engineTypeId: rotax.id },
      { name: "Senior", engineTypeId: rotax.id },
      { name: "DD2", engineTypeId: rotax.id },
      { name: "DD2-Masters", engineTypeId: rotax.id },
      { name: "X30 Mini", engineTypeId: iame.id },
      { name: "X30 Junior", engineTypeId: iame.id },
      { name: "X30 Senior", engineTypeId: iame.id },
      { name: "OK-J", engineTypeId: ok.id },
      { name: "OK", engineTypeId: ok.id },
      { name: "OK-NJ", engineTypeId: ok.id },
      { name: "OK-N", engineTypeId: ok.id },
      { name: "Academy-Senior", engineTypeId: academy.id },
      { name: "Academy-Junior", engineTypeId: academy.id },
      { name: "KZ", engineTypeId: kz.id },
      { name: "KZ2", engineTypeId: kz.id },
      { name: "KZ2-Masters", engineTypeId: kz.id },
    ],
    skipDuplicates: true,
  });
}
