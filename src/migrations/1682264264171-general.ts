import { MigrationInterface, QueryRunner } from "typeorm";

export class general1682264264171 implements MigrationInterface {
    name = 'general1682264264171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smartphone" DROP CONSTRAINT "FK_4ea020fcf2573dd821e1e243203"`);
        await queryRunner.query(`ALTER TABLE "smartphone" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cart_device" ADD "deviceIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_device" ADD CONSTRAINT "UQ_ef30b6d54b4ddc9117d5779ef43" UNIQUE ("deviceIdId")`);
        await queryRunner.query(`ALTER TABLE "cart_device" ADD CONSTRAINT "FK_ef30b6d54b4ddc9117d5779ef43" FOREIGN KEY ("deviceIdId") REFERENCES "smartphone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_device" DROP CONSTRAINT "FK_ef30b6d54b4ddc9117d5779ef43"`);
        await queryRunner.query(`ALTER TABLE "cart_device" DROP CONSTRAINT "UQ_ef30b6d54b4ddc9117d5779ef43"`);
        await queryRunner.query(`ALTER TABLE "cart_device" DROP COLUMN "deviceIdId"`);
        await queryRunner.query(`ALTER TABLE "smartphone" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "smartphone" ADD CONSTRAINT "FK_4ea020fcf2573dd821e1e243203" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
