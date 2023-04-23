import { MigrationInterface, QueryRunner } from "typeorm";

export class general1682263873137 implements MigrationInterface {
    name = 'general1682263873137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_device" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cartId" uuid, CONSTRAINT "PK_23b7f51c224d36b11ad970391f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_device" ADD CONSTRAINT "FK_e97161f7c6cff001658ec0249e0" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_device" DROP CONSTRAINT "FK_e97161f7c6cff001658ec0249e0"`);
        await queryRunner.query(`DROP TABLE "cart_device"`);
    }

}
