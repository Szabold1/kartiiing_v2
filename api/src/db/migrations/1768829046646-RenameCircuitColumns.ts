import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameCircuitColumns1768829046646 implements MigrationInterface {
  name = 'RenameCircuitColumns1768829046646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename columns in circuits table
    await queryRunner.query(
      `ALTER TABLE "circuits" RENAME COLUMN "nameShort" TO "locationName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuits" RENAME COLUMN "nameLong" TO "name"`,
    );

    // Drop and recreate the unique index
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_8a680fd153c7ab502996fd46df"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_fdf8b9ea23016094fbc900aff4" ON "circuits" ("locationName", "countryId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rename columns back
    await queryRunner.query(
      `ALTER TABLE "circuits" RENAME COLUMN "locationName" TO "nameShort"`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuits" RENAME COLUMN "name" TO "nameLong"`,
    );

    // Drop and recreate the unique index
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_fdf8b9ea23016094fbc900aff4"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_8a680fd153c7ab502996fd46df" ON "circuits" ("nameShort", "countryId")`,
    );
  }
}
