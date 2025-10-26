import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveRoundNumberFromRaceEvents1761380194142
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "race_events" DROP COLUMN "roundNumber"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "race_events" ADD COLUMN "roundNumber" integer`,
    );
  }
}
