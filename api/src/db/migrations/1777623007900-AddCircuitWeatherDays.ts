import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCircuitWeatherDays1777623007900 implements MigrationInterface {
  name = 'AddCircuitWeatherDays1777623007900';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop existing foreign keys and indexes that might conflict with the new schema changes
    await queryRunner.query(
      `ALTER TABLE "circuit_layouts" DROP CONSTRAINT "FK_circuit_layouts_circuit"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" DROP CONSTRAINT "FK_race_event_championships_race_event"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" DROP CONSTRAINT "FK_race_event_championships_championship"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_events" DROP CONSTRAINT "FK_race_events_circuit_layout"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_circuit_layout_circuit_name"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_race_event_championships_race_event_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_race_event_championships_championship_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_race_event_championships_unique"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_race_events_circuit_layout_id"`,
    );

    // Create the new circuit_weather_days table
    await queryRunner.query(
      `CREATE TABLE "circuit_weather_days" (
        "id" SERIAL NOT NULL,
        "date" date NOT NULL,
        "condition" character varying NOT NULL,
        "conditionIcon" character varying,
        "tempMin" numeric(5,2) NOT NULL,
        "tempMax" numeric(5,2) NOT NULL,
        "tempAvg" numeric(5,2),
        "windSpeed" numeric(5,2),
        "windGust" numeric(5,2),
        "precipitationMm" numeric(5,2),
        "fetchedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "circuitId" integer NOT NULL,
        CONSTRAINT "PK_7e26967b806abd3d8e2cf47849b" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c023b0921e7ae47d5c58d8f5c7" ON "circuit_weather_days" ("circuitId", "date")`,
    );

    // Alter existing columns to be nullable if needed, and recreate necessary indexes and foreign keys
    await queryRunner.query(
      `ALTER TABLE "circuit_layouts" ALTER COLUMN "circuitId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ALTER COLUMN "raceEventId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ALTER COLUMN "championshipId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_fac8d0c4a2c446874c1230692b" ON "circuit_layouts" ("circuitId", "name") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_55382cdb3dec1f619622b9fdf3" ON "race_event_championships" ("raceEventId", "championshipId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit_layouts" ADD CONSTRAINT "FK_0b9c1ae582a1ba18bc8a2f348ab" FOREIGN KEY ("circuitId") REFERENCES "circuits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ADD CONSTRAINT "FK_8ad735ead47f542c418238b422e" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ADD CONSTRAINT "FK_400868734a27210d0151bf6d5b8" FOREIGN KEY ("championshipId") REFERENCES "championships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit_weather_days" ADD CONSTRAINT "FK_c7733d0d245d4465515c013e2e0" FOREIGN KEY ("circuitId") REFERENCES "circuits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_events" ADD CONSTRAINT "FK_b7f2723e21451962a5eabd39c55" FOREIGN KEY ("circuitLayoutId") REFERENCES "circuit_layouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "race_events" DROP CONSTRAINT "FK_b7f2723e21451962a5eabd39c55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit_weather_days" DROP CONSTRAINT "FK_c7733d0d245d4465515c013e2e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" DROP CONSTRAINT "FK_400868734a27210d0151bf6d5b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" DROP CONSTRAINT "FK_8ad735ead47f542c418238b422e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit_layouts" DROP CONSTRAINT "FK_0b9c1ae582a1ba18bc8a2f348ab"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_55382cdb3dec1f619622b9fdf3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fac8d0c4a2c446874c1230692b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ALTER COLUMN "championshipId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ALTER COLUMN "raceEventId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit_layouts" ALTER COLUMN "circuitId" SET NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c023b0921e7ae47d5c58d8f5c7"`,
    );
    await queryRunner.query(`DROP TABLE "circuit_weather_days"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_race_events_circuit_layout_id" ON "race_events" ("circuitLayoutId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_race_event_championships_unique" ON "race_event_championships" ("championshipId", "raceEventId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_race_event_championships_championship_id" ON "race_event_championships" ("championshipId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_race_event_championships_race_event_id" ON "race_event_championships" ("raceEventId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_circuit_layout_circuit_name" ON "circuit_layouts" ("circuitId", "name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "race_events" ADD CONSTRAINT "FK_race_events_circuit_layout" FOREIGN KEY ("circuitLayoutId") REFERENCES "circuit_layouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ADD CONSTRAINT "FK_race_event_championships_championship" FOREIGN KEY ("championshipId") REFERENCES "championships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ADD CONSTRAINT "FK_race_event_championships_race_event" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit_layouts" ADD CONSTRAINT "FK_circuit_layouts_circuit" FOREIGN KEY ("circuitId") REFERENCES "circuits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
