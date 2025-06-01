-- CreateEnum
CREATE TYPE "LiveLinkType" AS ENUM ('stream', 'time');

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "circuits" (
    "id" SERIAL NOT NULL,
    "nameShort" TEXT NOT NULL,
    "nameLong" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "websiteLink" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "circuits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engine_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "engine_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "engineTypeId" INTEGER NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "championships" (
    "id" SERIAL NOT NULL,
    "nameShort" TEXT NOT NULL,
    "nameLong" TEXT NOT NULL,
    "nameSeries" TEXT,

    CONSTRAINT "championships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "race_events" (
    "id" SERIAL NOT NULL,
    "roundNumber" INTEGER,
    "championshipId" INTEGER NOT NULL,
    "raceWeekendId" INTEGER NOT NULL,

    CONSTRAINT "race_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "race_weekends" (
    "id" SERIAL NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "circuitId" INTEGER NOT NULL,

    CONSTRAINT "race_weekends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_links" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "raceEventId" INTEGER NOT NULL,

    CONSTRAINT "result_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "live_links" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" "LiveLinkType" NOT NULL,
    "raceEventId" INTEGER NOT NULL,

    CONSTRAINT "live_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RaceEventCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RaceEventCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "circuits_nameShort_countryId_key" ON "circuits"("nameShort", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "engine_types_name_key" ON "engine_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE INDEX "_RaceEventCategories_B_index" ON "_RaceEventCategories"("B");

-- AddForeignKey
ALTER TABLE "circuits" ADD CONSTRAINT "circuits_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_engineTypeId_fkey" FOREIGN KEY ("engineTypeId") REFERENCES "engine_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race_events" ADD CONSTRAINT "race_events_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "championships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race_events" ADD CONSTRAINT "race_events_raceWeekendId_fkey" FOREIGN KEY ("raceWeekendId") REFERENCES "race_weekends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "race_weekends" ADD CONSTRAINT "race_weekends_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "circuits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_links" ADD CONSTRAINT "result_links_raceEventId_fkey" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_links" ADD CONSTRAINT "live_links_raceEventId_fkey" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceEventCategories" ADD CONSTRAINT "_RaceEventCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceEventCategories" ADD CONSTRAINT "_RaceEventCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "race_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
