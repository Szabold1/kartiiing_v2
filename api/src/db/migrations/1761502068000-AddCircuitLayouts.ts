import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCircuitLayouts1761502068000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create circuit_layouts table
    await queryRunner.query(`
      CREATE TABLE "circuit_layouts" (
        "id" SERIAL NOT NULL,
        "name" character varying,
        "length" integer NOT NULL,
        "circuitId" integer NOT NULL,
        CONSTRAINT "PK_circuit_layout_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_circuit_layouts_circuit" FOREIGN KEY ("circuitId") REFERENCES "circuits"("id") ON DELETE CASCADE
      )
    `);

    // Create unique index for circuit + name combination
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_circuit_layout_circuit_name" ON "circuit_layouts" ("circuitId", "name")
    `);

    // Add circuitLayoutId column to race_events
    await queryRunner.query(`
      ALTER TABLE "race_events" ADD "circuitLayoutId" integer
    `);

    // Add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "race_events" 
      ADD CONSTRAINT "FK_race_events_circuit_layout" 
      FOREIGN KEY ("circuitLayoutId") REFERENCES "circuit_layouts"("id")
    `);

    // Create index on circuitLayoutId
    await queryRunner.query(`
      CREATE INDEX "IDX_race_events_circuit_layout_id" ON "race_events" ("circuitLayoutId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop index
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_race_events_circuit_layout_id"`,
    );

    // Drop foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "race_events" DROP CONSTRAINT "FK_race_events_circuit_layout"`,
    );

    // Drop circuitLayoutId column
    await queryRunner.query(
      `ALTER TABLE "race_events" DROP COLUMN "circuitLayoutId"`,
    );

    // Drop unique index
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_circuit_layout_circuit_name"`,
    );

    // Drop circuit_layouts table
    await queryRunner.query(`DROP TABLE IF EXISTS "circuit_layouts"`);
  }
}
