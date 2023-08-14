import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType("permission_value")
    .asEnum(["READ", "WRITE", "FULL"])
    .execute();

  await db.schema.createType("user_type").asEnum(["ADMIN", "USER"]).execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropType("user_type").ifExists().execute();
  await db.schema.dropType("permission_value").ifExists().execute();
}
