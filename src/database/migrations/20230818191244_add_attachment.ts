import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("attachments")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("url", "text", (col) => col.notNull())
    .addColumn("submission_id", "uuid", (col) =>
      col.references("submissions.id").onDelete("cascade"),
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("deleted_at", "timestamp")
    .execute();

  await db.schema
    .createIndex("attachment_submission_id_index")
    .on("attachments")
    .column("submission_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("attachments").ifExists().execute();
}
