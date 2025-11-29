import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DataSource } from 'typeorm';
import { CountrySeeder } from './country.seeder';
import { CategorySeeder } from './category.seeder';
import { ChampionshipSeeder } from './championship.seeder';
import { CircuitSeeder } from './circuit.seeder';
import { DriverSeeder } from './driver.seeder';
import { RaceEventSeeder } from './raceEvent.seeder';

export class MainSeeder {
  static async run(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting database seeding...');

    try {
      await CountrySeeder.run(dataSource);
      await CategorySeeder.run(dataSource);
      await ChampionshipSeeder.run(dataSource);
      await CircuitSeeder.run(dataSource);
      await DriverSeeder.run(dataSource);
      await RaceEventSeeder.run(dataSource);

      console.log('🎉 All seeding completed successfully!');
    } catch (error) {
      console.error('💥 Seeding failed:', error);
      throw error;
    }
  }
}

// Run all seeders if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await MainSeeder.run(dataSource);

    await app.close();
    console.log('Database seeding process completed!');
  })().catch((error) => {
    console.error('Failed to run seeders:', error);
    process.exit(1);
  });
}
