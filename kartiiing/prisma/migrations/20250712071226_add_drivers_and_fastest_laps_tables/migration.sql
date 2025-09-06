-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('PRACTICE', 'QUALIFYING', 'WARM_UP', 'HEAT', 'PRE_FINAL', 'FINAL', 'OTHER');

-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fastest_laps" (
    "id" SERIAL NOT NULL,
    "lapTime" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sessionType" "SessionType",
    "circuitId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "raceEventId" INTEGER,

    CONSTRAINT "fastest_laps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fastest_laps" ADD CONSTRAINT "fastest_laps_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "circuits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fastest_laps" ADD CONSTRAINT "fastest_laps_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fastest_laps" ADD CONSTRAINT "fastest_laps_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fastest_laps" ADD CONSTRAINT "fastest_laps_raceEventId_fkey" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
