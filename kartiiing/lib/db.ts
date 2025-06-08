import dotenv from "dotenv";
import { prisma } from "@/lib/prisma";

dotenv.config();

export const getRaces = async (year?: string) => {
  const yearNum = year ? parseInt(year) : undefined;
  const whereCondition = yearNum
    ? {
        OR: [
          {
            date_start: {
              gte: new Date(`${yearNum}-01-01`),
              lt: new Date(`${+yearNum + 1}-01-01`),
            },
          },
          {
            date_end: {
              gte: new Date(`${yearNum}-01-01`),
              lt: new Date(`${+yearNum + 1}-01-01`),
            },
          },
        ],
      }
    : undefined;

  const races = await prisma.raceEventView.findMany({
    where: whereCondition,
    orderBy: {
      date_start: "asc",
    },
  });

  return races;
};
