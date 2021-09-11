import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1631355103081 implements MigrationInterface {
    name = 'UserTable1631355103081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3fe76ecf0f0ef036ff981e9f67" ON "user_entity" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_3fe76ecf0f0ef036ff981e9f67"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
