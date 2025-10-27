import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DataSource } from 'typeorm';
import { Circuit } from '../../../entities/circuit.entity';
import { CircuitLayout } from '../../../entities/circuitLayout.entity';
import { Country } from '../../../entities/country.entity';
import * as fs from 'fs';
import * as path from 'path';

interface CircuitLayoutData {
  name?: string;
  length: number;
}

interface CircuitData {
  nameShort: string;
  nameLong: string;
  length: number;
  websiteLink?: string;
  latitude: number;
  longitude: number;
  layouts?: CircuitLayoutData[];
}

interface CircuitsByCountry {
  [countryCode: string]: CircuitData[];
}

// Read JSON file
const circuitsData: CircuitsByCountry = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/circuits.json'), 'utf-8'),
) as CircuitsByCountry;

export class CircuitSeeder {
  static async run(dataSource: DataSource): Promise<void> {
    try {
      const circuitRepository = dataSource.getRepository(Circuit);
      const layoutRepository = dataSource.getRepository(CircuitLayout);
      const countryRepository = dataSource.getRepository(Country);
      let newCircuitsCount = 0;
      let newLayoutsCount = 0;
      let skippedCount = 0;

      for (const [countryCode, circuits] of Object.entries(circuitsData)) {
        const country = await countryRepository.findOne({
          where: { code: countryCode },
        });

        if (!country) {
          console.warn(
            `⚠️ Country with code ${countryCode} not found. Skipping circuits for this country.`,
          );
          continue;
        }

        for (const circuitData of circuits) {
          // Check if circuit already exists
          let circuit = await circuitRepository.findOne({
            where: { nameShort: circuitData.nameShort },
            relations: ['layouts'],
          });

          if (!circuit) {
            // Create new circuit with default length
            circuit = await circuitRepository.save({
              nameShort: circuitData.nameShort,
              nameLong: circuitData.nameLong,
              length: circuitData.length,
              websiteLink: circuitData.websiteLink,
              latitude: circuitData.latitude,
              longitude: circuitData.longitude,
              country,
              layouts: [],
            });
            newCircuitsCount++;
          } else {
            skippedCount++;
          }

          // Add layouts if provided
          if (circuitData.layouts && circuitData.layouts.length > 0) {
            for (const layoutData of circuitData.layouts) {
              const query = layoutRepository
                .createQueryBuilder('layout')
                .where('layout.circuitId = :circuitId', {
                  circuitId: circuit.id,
                });

              if (layoutData.name) {
                query.andWhere('layout.name = :name', {
                  name: layoutData.name,
                });
              } else {
                query.andWhere('layout.name IS NULL');
              }

              const existingLayout = await query.getOne();

              if (!existingLayout) {
                await layoutRepository.save({
                  name: layoutData.name,
                  length: layoutData.length,
                  circuit,
                });
                newLayoutsCount++;
              }
            }
          }
        }
      }

      console.log(`✅ Circuit seeding completed:`);
      console.log(`---- New circuits added: ${newCircuitsCount}`);
      console.log(`---- New layouts added: ${newLayoutsCount}`);
      console.log(`---- Existing circuits skipped: ${skippedCount}`);
      console.log(
        `---- Total circuits processed: ${newCircuitsCount + skippedCount}`,
      );
    } catch (error) {
      console.error('❌ Error seeding circuits:', error);
      throw error;
    }
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await CircuitSeeder.run(dataSource);

    await app.close();
    console.log('Circuit seeding completed!');
  })().catch(console.error);
}
