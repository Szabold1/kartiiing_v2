import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DataSource } from 'typeorm';
import { Category } from '../../../entities/category.entity';
import * as fs from 'fs';
import * as path from 'path';

interface CategoriesByEngineType {
  [engineType: string]: Array<{ name: string; order: number }>;
}

// Read JSON file
const categoriesData: CategoriesByEngineType = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/categories.json'), 'utf-8'),
) as CategoriesByEngineType;

export class CategorySeeder {
  static async run(dataSource: DataSource): Promise<void> {
    try {
      const categoryRepository = dataSource.getRepository(Category);
      let newCategoriesCount = 0;
      let skippedCount = 0;

      for (const [engineType, categories] of Object.entries(categoriesData)) {
        for (const categoryData of categories) {
          const { name, order } = categoryData;

          // Check if category already exists
          const existingCategory = await categoryRepository.findOne({
            where: { engineType, name },
          });
          if (!existingCategory) {
            await categoryRepository.save({ engineType, name, order });
            newCategoriesCount++;
          } else {
            await categoryRepository.update({ engineType, name }, { order });
            skippedCount++;
          }
        }
      }

      console.log(`✅ Category seeding completed:`);
      console.log(`---- New categories added: ${newCategoriesCount}`);
      console.log(`---- Existing categories updated: ${skippedCount}`);
      console.log(
        `---- Total categories processed: ${newCategoriesCount + skippedCount}`,
      );
    } catch (error) {
      console.error('❌ Error seeding categories:', error);
      throw error;
    }
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await CategorySeeder.run(dataSource);

    await app.close();
    console.log('Category seeding completed!');
  })().catch(console.error);
}
