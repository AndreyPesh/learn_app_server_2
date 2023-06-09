import { MigrationInterface, QueryRunner } from "typeorm";

export class general1678702725891 implements MigrationInterface {
    name = 'general1678702725891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "photo" character varying NOT NULL DEFAULT 'default.svg', "verified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "smartphoneBrand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "brand" character varying NOT NULL, CONSTRAINT "PK_058aebdc5a16620c79b8d767397" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "smartphoneImages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "smartphoneId" uuid, CONSTRAINT "PK_fdea559a7a5158a4aed2c71c32b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "smartphone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "model" character varying NOT NULL, "display" character varying NOT NULL, "price" integer NOT NULL, "year" integer NOT NULL, "cpu" character varying NOT NULL, "frequency" integer NOT NULL, "memory" integer NOT NULL, "nfc" boolean NOT NULL DEFAULT false, "brandId" uuid, CONSTRAINT "PK_2e03f71af61b8e63838559fc83a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "smartphoneImages" ADD CONSTRAINT "FK_a626e704b7ebde2ad58303633d8" FOREIGN KEY ("smartphoneId") REFERENCES "smartphone"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "smartphone" ADD CONSTRAINT "FK_009f4c62fd3dcc6810ab2b6bdaf" FOREIGN KEY ("brandId") REFERENCES "smartphoneBrand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smartphone" DROP CONSTRAINT "FK_009f4c62fd3dcc6810ab2b6bdaf"`);
        await queryRunner.query(`ALTER TABLE "smartphoneImages" DROP CONSTRAINT "FK_a626e704b7ebde2ad58303633d8"`);
        await queryRunner.query(`DROP TABLE "smartphone"`);
        await queryRunner.query(`DROP TABLE "smartphoneImages"`);
        await queryRunner.query(`DROP TABLE "smartphoneBrand"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
