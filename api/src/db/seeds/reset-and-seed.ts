import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { DatabaseTruncator } from './truncate-db';
import { MainSeeder } from './seeders/index';

export class DatabaseResetter {
  static async resetAndSeed(dataSource: DataSource): Promise<void> {
    console.log('🔄 Starting database reset and seed...');

    try {
      await DatabaseTruncator.truncateAll(dataSource);
      await MainSeeder.run(dataSource);

      console.log('🎉 Database reset and seed completed successfully!');
    } catch (error) {
      console.error('💥 Database reset and seed failed:', error);
      throw error;
    }
  }
}

// Run reset and seed if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await DatabaseResetter.resetAndSeed(dataSource);

    await app.close();
    console.log('Database reset and seed process completed!');
  })().catch((error) => {
    console.error('Failed to reset and seed database:', error);
    process.exit(1);
  });
}
