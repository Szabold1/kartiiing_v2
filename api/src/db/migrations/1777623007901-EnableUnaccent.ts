import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnableUnaccent1777623007901 implements MigrationInterface {
  name = 'EnableUnaccent1777623007901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS unaccent`);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Don't drop the extension in down migration as other things may depend on it
    // and dropping it causes no harm if left behind.
  }
}
