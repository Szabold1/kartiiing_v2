import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DataSource } from 'typeorm';
import { Championship } from '../../../entities/championship.entity';
import * as fs from 'fs';
import * as path from 'path';

interface ChampionshipData {
  nameLong: string;
  nameSeries: string;
  order: number;
}

interface ChampionshipsByNameShort {
  [nameShort: string]: ChampionshipData[];
}

// Read JSON file
const championshipsData: ChampionshipsByNameShort = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/championships.json'), 'utf-8'),
) as ChampionshipsByNameShort;

export class ChampionshipSeeder {
  static async run(dataSource: DataSource): Promise<void> {
    try {
      const championshipRepository = dataSource.getRepository(Championship);
      let newChampionshipsCount = 0;
      let skippedCount = 0;

      for (const [nameShort, championships] of Object.entries(
        championshipsData,
      )) {
        for (const championshipData of championships) {
          const { nameLong, nameSeries, order } = championshipData;

          // Check if championship already exists
          const existingChampionship = await championshipRepository.findOne({
            where: { nameShort, nameLong, nameSeries },
          });
          if (!existingChampionship) {
            await championshipRepository.save({
              nameShort,
              nameLong,
              nameSeries,
              order,
            });
            newChampionshipsCount++;
          } else {
            await championshipRepository.update(
              { nameShort, nameLong, nameSeries },
              { order },
            );
            skippedCount++;
          }
        }
      }

      console.log(`✅ Championship seeding completed:`);
      console.log(`---- New championships added: ${newChampionshipsCount}`);
      console.log(`---- Existing championships updated: ${skippedCount}`);
      console.log(
        `---- Total championships processed: ${newChampionshipsCount + skippedCount}`,
      );
    } catch (error) {
      console.error('❌ Error seeding championships:', error);
      throw error;
    }
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await ChampionshipSeeder.run(dataSource);

    await app.close();
    console.log('Championship seeding completed!');
  })().catch(console.error);
}
