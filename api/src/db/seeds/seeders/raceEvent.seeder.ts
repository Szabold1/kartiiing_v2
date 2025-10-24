import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DataSource, Repository } from 'typeorm';
import { Championship } from '../../../entities/championship.entity';
import { RaceEvent } from '../../../entities/raceEvent.entity';
import { RaceEventResult } from '../../../entities/raceEventResult.entity';
import { Driver } from '../../../entities/driver.entity';
import { FastestLap } from '../../../entities/fastestLap.entity';
import { Category } from '../../../entities/category.entity';
import { Circuit } from '../../../entities/circuit.entity';
import * as fs from 'fs';
import * as path from 'path';

interface FastestLapData {
  category: string;
  driverName: string;
  lapTime: string;
  date: string;
  sessionType: string;
}

interface ResultLinkData {
  category: string;
  url: string;
}

interface RaceEventData {
  roundNumber?: number;
  circuitShortName: string;
  dateStart?: string;
  dateEnd: string;
  categoryNames?: string[];
  resultLinks?: ResultLinkData[];
  fastestLaps?: FastestLapData[];
}

interface RaceEventsByChampionship {
  [championshipName: string]: RaceEventData[];
}

interface RaceEventsByYear {
  [year: string]: RaceEventsByChampionship;
}

// Read JSON file
const raceEventsData: RaceEventsByYear = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/race-events.json'), 'utf-8'),
) as RaceEventsByYear;

export class RaceEventSeeder {
  static async run(dataSource: DataSource): Promise<void> {
    let newRaceEventsCount = 0;
    let newResultsCount = 0;
    let newFastestLapsCount = 0;
    let skippedCount = 0;

    const championshipRepository = dataSource.getRepository(Championship);
    const categoryRepository = dataSource.getRepository(Category);
    const driverRepository = dataSource.getRepository(Driver);
    const raceEventResultRepository = dataSource.getRepository(RaceEventResult);
    const fastestLapRepository = dataSource.getRepository(FastestLap);

    // Group events by circuit + dateEnd to merge championships
    const groupedEvents = new Map<
      string,
      {
        eventData: RaceEventData;
        championships: Championship[];
      }
    >();

    // First pass: collect all championships for each circuit + dateEnd combination
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_year, yearData] of Object.entries(raceEventsData)) {
      for (const [championshipName, events] of Object.entries(yearData)) {
        const [nameShort, ...nameSeries] = championshipName.split(' ');
        const series = nameSeries.join(' ');

        const championship = await championshipRepository.findOne({
          where: { nameShort, nameSeries: series },
        });
        if (!championship) {
          console.warn(
            `⚠️ Championship '${championshipName}' not found. Skipping events.`,
          );
          continue;
        }

        for (const eventData of events) {
          // Create a unique key for grouping events from same circuit + date
          const groupKey = `${eventData.circuitShortName}||${eventData.dateEnd}`;

          if (!groupedEvents.has(groupKey)) {
            groupedEvents.set(groupKey, {
              eventData,
              championships: [],
            });
          }

          const grouped = groupedEvents.get(groupKey)!;
          // Add championship if not already present
          if (!grouped.championships.some((c) => c.id === championship.id)) {
            grouped.championships.push(championship);
          }
          // Merge categories and other data
          if (eventData.categoryNames) {
            grouped.eventData.categoryNames = [
              ...(grouped.eventData.categoryNames || []),
              ...eventData.categoryNames,
            ];
            grouped.eventData.categoryNames = Array.from(
              new Set(grouped.eventData.categoryNames),
            );
          }
          if (eventData.resultLinks) {
            grouped.eventData.resultLinks = [
              ...(grouped.eventData.resultLinks || []),
              ...eventData.resultLinks,
            ];
            // Deduplicate by URL
            const urlSet = new Set<string>();
            grouped.eventData.resultLinks =
              grouped.eventData.resultLinks.filter(
                (r) => !urlSet.has(r.url) && urlSet.add(r.url),
              );
          }
          if (eventData.fastestLaps) {
            grouped.eventData.fastestLaps = [
              ...(grouped.eventData.fastestLaps || []),
              ...eventData.fastestLaps,
            ];
            // Deduplicate by category + driverName
            const keySet = new Set<string>();
            grouped.eventData.fastestLaps =
              grouped.eventData.fastestLaps.filter((f) => {
                const key = `${f.category}||${f.driverName}`;
                return !keySet.has(key) && keySet.add(key);
              });
          }
        }
      }
    }

    // Second pass: create race events with many-to-many championships
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_groupKey, { eventData, championships }] of groupedEvents) {
      try {
        const raceEventResult = await RaceEventSeeder.findOrCreateRaceEvent(
          dataSource,
          eventData,
          championships,
        );

        if (!raceEventResult.raceEvent || !raceEventResult.isNew) {
          skippedCount++;
          continue;
        }

        const raceEvent = raceEventResult.raceEvent;
        newRaceEventsCount++;

        if (eventData.categoryNames) {
          for (const categoryName of eventData.categoryNames) {
            await RaceEventSeeder.addCategoryToRaceEvent(
              dataSource,
              categoryName,
              raceEvent,
            );
          }
        }

        if (eventData.resultLinks) {
          newResultsCount += await RaceEventSeeder.addResultsToEvent(
            raceEventResultRepository,
            categoryRepository,
            eventData.resultLinks,
            raceEvent,
          );
        }

        if (eventData.fastestLaps) {
          newFastestLapsCount += await RaceEventSeeder.addFastestLapsToEvent(
            fastestLapRepository,
            categoryRepository,
            driverRepository,
            eventData.fastestLaps,
            raceEvent,
          );
        }
      } catch (error: any) {
        console.error(`❌ Error processing event:`, error);
        throw error;
      }
    }

    console.log(`✅ Race event seeding completed:`);
    console.log(`---- New race events added: ${newRaceEventsCount}`);
    console.log(`---- New result links added: ${newResultsCount}`);
    console.log(`---- New fastest laps added: ${newFastestLapsCount}`);
    console.log(`---- Existing events skipped: ${skippedCount}`);
    console.log(
      `---- Total events processed: ${newRaceEventsCount + skippedCount}`,
    );
  }

  // Find or create a race event with multiple championships
  private static async findOrCreateRaceEvent(
    dataSource: DataSource,
    eventData: RaceEventData,
    championships: Championship[],
  ): Promise<{ raceEvent: RaceEvent | null; isNew: boolean }> {
    const raceEventRepository = dataSource.getRepository(RaceEvent);
    const circuitRepository = dataSource.getRepository(Circuit);

    const circuit = await circuitRepository.findOne({
      where: { nameShort: eventData.circuitShortName },
    });
    if (!circuit) {
      console.warn(
        `⚠️ Circuit '${eventData.circuitShortName}' not found. Skipping event.`,
      );
      return { raceEvent: null, isNew: false };
    }

    // Use dateStart or default to dateEnd if not provided
    const dateStart = eventData.dateStart || eventData.dateEnd;

    const existingEvent = await raceEventRepository.findOne({
      where: {
        circuit: { id: circuit.id },
        dateEnd: eventData.dateEnd,
        dateStart,
        roundNumber: eventData.roundNumber || undefined,
      },
      relations: ['championships', 'circuit'],
    });

    if (existingEvent) {
      // Add any missing championships to existing event
      const existingChampIds = new Set(
        existingEvent.championships.map((c) => c.id),
      );
      const newChampionships = championships.filter(
        (c) => !existingChampIds.has(c.id),
      );

      if (newChampionships.length > 0) {
        existingEvent.championships.push(...newChampionships);
        await raceEventRepository.save(existingEvent);
      }

      return { raceEvent: existingEvent, isNew: false };
    }

    const raceEvent = await raceEventRepository.save({
      championships,
      circuit,
      dateStart,
      dateEnd: eventData.dateEnd,
      roundNumber: eventData.roundNumber || undefined,
    });

    return { raceEvent, isNew: true };
  }

  // Add category to race event
  private static async addCategoryToRaceEvent(
    dataSource: DataSource,
    categoryName: string,
    raceEvent: RaceEvent,
  ): Promise<void> {
    const raceEventRepository = dataSource.getRepository(RaceEvent);
    const categoryRepository = dataSource.getRepository(Category);

    const category = await categoryRepository.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      console.warn(`Category '${categoryName}' not found in addToRaceEvent.`);
      return;
    }

    if (!raceEvent.categories) {
      raceEvent.categories = [];
    }

    // Check if category already exists in the many-to-many relationship
    if (raceEvent.categories.some((c) => c.id === category.id)) {
      console.warn(`Category '${categoryName}' already exists in event.`);
      return;
    }

    try {
      // Add category to the many-to-many relationship
      raceEvent.categories.push(category);
      await raceEventRepository.save(raceEvent);
    } catch (error: any) {
      console.error(`Error adding category to race event: ${error}`);
      throw new Error(
        `Failed to add category '${categoryName}' to race event: ${error}`,
      );
    }
  }

  // Add result links to a race event
  private static async addResultsToEvent(
    raceEventResultRepository: Repository<RaceEventResult>,
    categoryRepository: Repository<Category>,
    resultLinks: ResultLinkData[],
    raceEvent: RaceEvent,
  ): Promise<number> {
    let count = 0;
    for (const resultLink of resultLinks) {
      try {
        const category = await categoryRepository.findOne({
          where: { name: resultLink.category },
        });
        if (!category) {
          console.warn(
            `⚠️ Category '${resultLink.category}' not found for result link '${resultLink.url}'. Skipping result link.`,
          );
          continue;
        }
        const result = await raceEventResultRepository.save({
          raceEvent,
          category,
          url: resultLink.url,
        });
        if (result != null) count++;
      } catch (error: any) {
        console.error(
          `❌ Error adding result link for event ${raceEvent.id}:`,
          error,
        );
      }
    }
    return count;
  }

  // Add fastest laps to a race event
  private static async addFastestLapsToEvent(
    fastestLapRepository: Repository<FastestLap>,
    categoryRepository: Repository<Category>,
    driverRepository: Repository<Driver>,
    fastestLaps: FastestLapData[],
    raceEvent: RaceEvent,
  ): Promise<number> {
    let count = 0;
    for (const fastestLapData of fastestLaps) {
      try {
        const category = await categoryRepository.findOne({
          where: { name: fastestLapData.category },
        });
        if (!category) {
          console.warn(
            `⚠️ Category '${fastestLapData.category}' not found for fastest lap. Skipping fastest lap.`,
          );
          continue;
        }

        const { firstName, lastName } = RaceEventSeeder.parseDriverName(
          fastestLapData.driverName,
        );
        const driver = await driverRepository.findOne({
          where: { firstName: firstName, lastName: lastName },
        });
        if (!driver) {
          console.warn(
            `⚠️ Driver '${fastestLapData.driverName}' not found. Skipping fastest lap.`,
          );
          continue;
        }

        const result = await fastestLapRepository.save({
          category,
          driver,
          lapTime: parseFloat(fastestLapData.lapTime),
          date: fastestLapData.date,
          sessionType: fastestLapData.sessionType,
          circuit: raceEvent.circuit,
          raceEvent,
        });
        if (result != null) count++;
      } catch (error: any) {
        console.error(
          `❌ Error adding fastest lap for event ${raceEvent.id}:`,
          error,
        );
      }
    }
    return count;
  }

  /**
   * Parse driver name from a string.
   * Supports formats like "First Last" or "First|Last".
   */
  private static parseDriverName(driverName: string): {
    firstName: string;
    lastName: string;
  } {
    if (driverName.includes('|')) {
      const [firstName, lastName] = driverName
        .split('|')
        .map((name: string) => name.trim());
      return { firstName, lastName };
    } else {
      const nameParts = driverName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      return { firstName, lastName };
    }
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await RaceEventSeeder.run(dataSource);

    await app.close();
    console.log('Race event seeding completed!');
  })().catch(console.error);
}
