import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(30)", (col) => col.notNull())
    .addColumn("email", "varchar(60)", (col) => col.notNull().unique())
    .addColumn("hashed_password", "varchar(60)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("deleted_at", "timestamp")
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("users").ifExists().execute();
};
