import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoundNumberPerChampionship1761380194141
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the old many-to-many join table with both constraints
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" DROP CONSTRAINT "FK_8ad735ead47f542c418238b422e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" DROP CONSTRAINT "FK_400868734a27210d0151bf6d5b8"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "race_event_championships"`);

    // Create the new race_event_championships table with id and roundNumber
    await queryRunner.query(`
      CREATE TABLE "race_event_championships" (
        "id" SERIAL NOT NULL,
        "roundNumber" integer,
        "raceEventId" integer NOT NULL,
        "championshipId" integer NOT NULL,
        CONSTRAINT "PK_race_event_championship_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_race_event_championships_race_event" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_race_event_championships_championship" FOREIGN KEY ("championshipId") REFERENCES "championships"("id")
      )
    `);

    // Create indexes
    await queryRunner.query(
      `CREATE INDEX "IDX_race_event_championships_race_event_id" ON "race_event_championships" ("raceEventId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_race_event_championships_championship_id" ON "race_event_championships" ("championshipId")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_race_event_championships_unique" ON "race_event_championships" ("raceEventId", "championshipId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the new table
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_race_event_championships_unique"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_race_event_championships_championship_id"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_race_event_championships_race_event_id"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "race_event_championships"`);

    // Recreate the old simple many-to-many join table
    await queryRunner.query(`
      CREATE TABLE "race_event_championships" (
        "raceEventId" integer NOT NULL,
        "championshipId" integer NOT NULL,
        CONSTRAINT "PK_race_event_championships_composite" PRIMARY KEY ("raceEventId", "championshipId"),
        CONSTRAINT "FK_8ad735ead47f542c418238b422e" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_400868734a27210d0151bf6d5b8" FOREIGN KEY ("championshipId") REFERENCES "championships"("id")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_8ad735ead47f542c418238b422" ON "race_event_championships" ("raceEventId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_400868734a27210d0151bf6d5b" ON "race_event_championships" ("championshipId")`,
    );
  }
}
