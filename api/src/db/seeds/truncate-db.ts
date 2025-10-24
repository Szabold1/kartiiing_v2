import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';

interface TableRow {
  tablename: string;
}

export class DatabaseTruncator {
  static async truncateAll(dataSource: DataSource): Promise<void> {
    console.log('🗑️  Starting database truncation...');

    try {
      const tables: TableRow[] = await dataSource.query(`
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename != '_prisma_migrations'
      `);

      if (tables.length === 0) {
        console.log('No tables found to truncate.');
        return;
      }

      // Disable foreign key checks temporarily
      await dataSource.query('SET session_replication_role = replica;');

      for (const table of tables) {
        console.log(`  Truncating table: ${table.tablename}`);
        await dataSource.query(
          `TRUNCATE TABLE "${table.tablename}" RESTART IDENTITY CASCADE;`,
        );
      }

      // Re-enable foreign key checks
      await dataSource.query('SET session_replication_role = DEFAULT;');

      console.log('🎉 Database truncation completed successfully!');
    } catch (error) {
      console.error('💥 Database truncation failed:', error);
      throw error;
    }
  }
}

// Run truncation if this file is executed directly
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await DatabaseTruncator.truncateAll(dataSource);

    await app.close();
    console.log('Database truncation process completed!');
  })().catch((error) => {
    console.error('Failed to truncate database:', error);
    process.exit(1);
  });
}
