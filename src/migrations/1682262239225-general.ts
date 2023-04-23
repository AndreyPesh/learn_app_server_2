import { MigrationInterface, QueryRunner } from "typeorm";

export class general1682262239225 implements MigrationInterface {
    name = 'general1682262239225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
