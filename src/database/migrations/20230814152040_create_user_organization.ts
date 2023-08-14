import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("user_organization")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) =>
      col.references("users.id").onDelete("cascade").notNull()
    )
    .addColumn("organization_id", "integer", (col) =>
      col.references("organizations.id").onDelete("cascade").notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("user_organization_join_compound_index")
    .on("user_organization")
    .columns(["user_id", "organization_id"])
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema
    .dropIndex("user_organization_join_compound_index")
    .ifExists()
    .execute();
  await db.schema.dropTable("user_organization").ifExists().execute();
};
