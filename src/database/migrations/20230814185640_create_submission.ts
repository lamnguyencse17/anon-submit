import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("submissions")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("organization_id", "integer", (col) =>
      col.references("organizations.id").notNull().onDelete("cascade"),
    )
    .addColumn("is_approved", "boolean", (col) => col.defaultTo(false))
    .addColumn("actioned_by", "integer", (col) => col.references("users.id"))
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("approved_at", "timestamp")
    .addColumn("deleted_at", "timestamp")
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("submissions").ifExists().execute();
};
