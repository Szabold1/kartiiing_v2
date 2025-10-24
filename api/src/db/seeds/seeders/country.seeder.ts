import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DataSource } from 'typeorm';
import { Country } from '../../../entities/country.entity';
import * as fs from 'fs';
import * as path from 'path';

interface CountryData {
  name: string;
  code: string;
}

// Read JSON file
const countriesData: CountryData[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/countries.json'), 'utf-8'),
) as CountryData[];

export class CountrySeeder {
  static async run(dataSource: DataSource): Promise<void> {
    try {
      const repository = dataSource.getRepository(Country);
      let newCountriesCount = 0;
      let skippedCount = 0;

      for (const countryData of countriesData) {
        // Check if country already exists
        const existingCountry = await repository.findOne({
          where: { code: countryData.code },
        });

        if (!existingCountry) {
          await repository.save(countryData);
          newCountriesCount++;
        } else {
          skippedCount++;
        }
      }

      console.log(`✅ Country seeding completed:`);
      console.log(`---- New countries added: ${newCountriesCount}`);
      console.log(`---- Existing countries skipped: ${skippedCount}`);
      console.log(
        `---- Total countries processed: ${newCountriesCount + skippedCount}`,
      );
    } catch (error) {
      console.error('❌ Error seeding countries:', error);
      throw error;
    }
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await CountrySeeder.run(dataSource);

    await app.close();
    console.log('Seeding completed!');
  })().catch(console.error);
}
