import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DataSource } from 'typeorm';
import { Country } from '../../../entities/country.entity';
import { Driver } from '../../../entities/driver.entity';
import * as fs from 'fs';
import * as path from 'path';

interface DriverData {
  firstName: string;
  lastName: string;
}

interface DriversByCountry {
  [countryCode: string]: DriverData[];
}

// Read JSON file
const driversData: DriversByCountry = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/drivers.json'), 'utf-8'),
) as DriversByCountry;

export class DriverSeeder {
  static async run(dataSource: DataSource): Promise<void> {
    try {
      const driverRepository = dataSource.getRepository(Driver);
      const countryRepository = dataSource.getRepository(Country);
      let newDriversCount = 0;
      let skippedCount = 0;

      for (const [countryCode, drivers] of Object.entries(driversData)) {
        const country = await countryRepository.findOne({
          where: { code: countryCode },
        });
        if (!country) {
          console.warn(
            `⚠️ Country with code ${countryCode} not found. Skipping drivers for this country.`,
          );
          continue;
        }
        for (const driverData of drivers) {
          // Check if driver already exists
          const existingDriver = await driverRepository.findOne({
            where: {
              firstName: driverData.firstName,
              lastName: driverData.lastName,
              country: { id: country.id },
            },
            relations: ['country'],
          });
          if (!existingDriver) {
            await driverRepository.save({
              firstName: driverData.firstName,
              lastName: driverData.lastName,
              country,
            });
            newDriversCount++;
          } else {
            skippedCount++;
          }
        }
      }

      console.log(`✅ Driver seeding completed:`);
      console.log(`---- New drivers added: ${newDriversCount}`);
      console.log(`---- Existing drivers skipped: ${skippedCount}`);
      console.log(
        `---- Total drivers processed: ${newDriversCount + skippedCount}`,
      );
    } catch (error) {
      console.error('❌ Error seeding drivers:', error);
      throw error;
    }
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await DriverSeeder.run(dataSource);

    await app.close();
    console.log('Driver seeding completed!');
  })().catch(console.error);
}
