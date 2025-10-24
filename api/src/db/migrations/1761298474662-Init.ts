import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1761298474662 implements MigrationInterface {
  name = 'Init1761298474662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "engineType" character varying NOT NULL, "name" character varying NOT NULL, "order" integer NOT NULL DEFAULT '999', CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_36e98f99a0605c0427916e84a1" ON "categories" ("engineType", "name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "drivers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "countryId" integer, CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_26227a54d1b15c5665b3a62192" ON "drivers" ("firstName", "lastName", "countryId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" SERIAL NOT NULL, "code" character varying(2) NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_b47cbb5311bad9c9ae17b8c1eda" UNIQUE ("code"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b47cbb5311bad9c9ae17b8c1ed" ON "countries" ("code") `,
    );
    await queryRunner.query(
      `CREATE TABLE "circuits" ("id" SERIAL NOT NULL, "nameShort" character varying NOT NULL, "nameLong" character varying NOT NULL, "length" integer NOT NULL, "websiteLink" character varying, "latitude" numeric(10,6) NOT NULL, "longitude" numeric(10,6) NOT NULL, "countryId" integer, CONSTRAINT "PK_8909faf3f3e7b1c1b002936b92d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_8a680fd153c7ab502996fd46df" ON "circuits" ("nameShort", "countryId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "championships" ("id" SERIAL NOT NULL, "nameShort" character varying NOT NULL, "nameLong" character varying NOT NULL, "nameSeries" character varying NOT NULL, "order" integer NOT NULL DEFAULT '999', CONSTRAINT "PK_0f99e3669ee9b045b47cc8c916d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_bfacbed54fe86865dc4b99195a" ON "championships" ("nameShort", "nameSeries") `,
    );
    await queryRunner.query(
      `CREATE TABLE "fastest_laps" ("id" SERIAL NOT NULL, "lapTime" integer NOT NULL, "date" date NOT NULL, "sessionType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "driverId" integer, "circuitId" integer, "categoryId" integer, "raceEventId" integer, CONSTRAINT "PK_d4b0307784ac62063467d4cb27f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4f3469d242f71a265778cf4c5c" ON "fastest_laps" ("circuitId", "categoryId", "sessionType", "date") `,
    );
    await queryRunner.query(
      `CREATE TABLE "race_events" ("id" SERIAL NOT NULL, "roundNumber" integer, "dateStart" date NOT NULL, "dateEnd" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "circuitId" integer, CONSTRAINT "PK_e6d5e4409ac7eb200e721c79820" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5f56c394fe611f27f691951e9e" ON "race_events" ("circuitId", "dateEnd") `,
    );
    await queryRunner.query(
      `CREATE TABLE "race_event_results" ("id" SERIAL NOT NULL, "url" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "raceEventId" integer, "categoryId" integer, CONSTRAINT "PK_8a41fcce96b629dd827de072f9a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_92c966f16eb31998556f8441b5" ON "race_event_results" ("raceEventId", "categoryId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "race_event_championships" ("raceEventId" integer NOT NULL, "championshipId" integer NOT NULL, CONSTRAINT "PK_55382cdb3dec1f619622b9fdf35" PRIMARY KEY ("raceEventId", "championshipId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8ad735ead47f542c418238b422" ON "race_event_championships" ("raceEventId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_400868734a27210d0151bf6d5b" ON "race_event_championships" ("championshipId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "race_event_categories" ("raceEventId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_864cbb07ea5bfa6673198bb5f96" PRIMARY KEY ("raceEventId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7e0b5babb339c1397a3d948740" ON "race_event_categories" ("raceEventId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_92dcf72cfd62f45f336ca47886" ON "race_event_categories" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "drivers" ADD CONSTRAINT "FK_f56aa3df52d63c10325d3c950e1" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuits" ADD CONSTRAINT "FK_a299e1079b714985c8df494716a" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fastest_laps" ADD CONSTRAINT "FK_29611e0e9fc50830e9834504925" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fastest_laps" ADD CONSTRAINT "FK_a16713ccac2af4d98404924c3bd" FOREIGN KEY ("circuitId") REFERENCES "circuits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fastest_laps" ADD CONSTRAINT "FK_55bdc7af0fe6cecc80857db80c4" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fastest_laps" ADD CONSTRAINT "FK_3054ab1994a56e53309012d9de0" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_events" ADD CONSTRAINT "FK_577354232fe0085585a2535bb7d" FOREIGN KEY ("circuitId") REFERENCES "circuits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_results" ADD CONSTRAINT "FK_d801135adb50cd23c0afebc6add" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_results" ADD CONSTRAINT "FK_4d1e90c9ba9bb669447ed34edd7" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ADD CONSTRAINT "FK_8ad735ead47f542c418238b422e" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" ADD CONSTRAINT "FK_400868734a27210d0151bf6d5b8" FOREIGN KEY ("championshipId") REFERENCES "championships"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_categories" ADD CONSTRAINT "FK_7e0b5babb339c1397a3d948740e" FOREIGN KEY ("raceEventId") REFERENCES "race_events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_categories" ADD CONSTRAINT "FK_92dcf72cfd62f45f336ca478865" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "race_event_categories" DROP CONSTRAINT "FK_92dcf72cfd62f45f336ca478865"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_categories" DROP CONSTRAINT "FK_7e0b5babb339c1397a3d948740e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" DROP CONSTRAINT "FK_400868734a27210d0151bf6d5b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_championships" DROP CONSTRAINT "FK_8ad735ead47f542c418238b422e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_results" DROP CONSTRAINT "FK_4d1e90c9ba9bb669447ed34edd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_event_results" DROP CONSTRAINT "FK_d801135adb50cd23c0afebc6add"`,
    );
    await queryRunner.query(
      `ALTER TABLE "race_events" DROP CONSTRAINT "FK_577354232fe0085585a2535bb7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fastest_laps" DROP CONSTRAINT "FK_3054ab1994a56e53309012d9de0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fastest_laps" DROP CONSTRAINT "FK_55bdc7af0fe6cecc80857db80c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fastest_laps" DROP CONSTRAINT "FK_a16713ccac2af4d98404924c3bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fastest_laps" DROP CONSTRAINT "FK_29611e0e9fc50830e9834504925"`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuits" DROP CONSTRAINT "FK_a299e1079b714985c8df494716a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "drivers" DROP CONSTRAINT "FK_f56aa3df52d63c10325d3c950e1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_92dcf72cfd62f45f336ca47886"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7e0b5babb339c1397a3d948740"`,
    );
    await queryRunner.query(`DROP TABLE "race_event_categories"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_400868734a27210d0151bf6d5b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8ad735ead47f542c418238b422"`,
    );
    await queryRunner.query(`DROP TABLE "race_event_championships"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_92c966f16eb31998556f8441b5"`,
    );
    await queryRunner.query(`DROP TABLE "race_event_results"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f56c394fe611f27f691951e9e"`,
    );
    await queryRunner.query(`DROP TABLE "race_events"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4f3469d242f71a265778cf4c5c"`,
    );
    await queryRunner.query(`DROP TABLE "fastest_laps"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bfacbed54fe86865dc4b99195a"`,
    );
    await queryRunner.query(`DROP TABLE "championships"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8a680fd153c7ab502996fd46df"`,
    );
    await queryRunner.query(`DROP TABLE "circuits"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b47cbb5311bad9c9ae17b8c1ed"`,
    );
    await queryRunner.query(`DROP TABLE "countries"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_26227a54d1b15c5665b3a62192"`,
    );
    await queryRunner.query(`DROP TABLE "drivers"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_36e98f99a0605c0427916e84a1"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
