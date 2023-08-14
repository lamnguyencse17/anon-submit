import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("organizations")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deleted_at", "timestamp")
    .addColumn("owned_by", "integer", (col) => col.references("users.id"))
    .execute();

  await db.schema
    .createIndex("organization_owned_by_index")
    .on("organizations")
    .column("owned_by")
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("organizations").ifExists().execute();
};
