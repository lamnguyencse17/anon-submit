import { Kysely } from "kysely";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("organizations")
    .addColumn("slug", "text")
    .execute();

  const rows = await db
    .selectFrom("organizations")
    .select(["id", "name"])
    .execute();

  await Promise.all(
    rows.map((row) =>
      db
        .updateTable("organizations")
        .set({ slug: slugify(row.name) })
        .where("id", "=", row.id)
        .execute(),
    ),
  );

  await db.schema
    .alterTable("organizations")
    .alterColumn("slug", (col) => col.setNotNull())
    .execute();

  await db.schema
    .createIndex("organization_slug_index")
    .on("organizations")
    .column("slug")
    .unique()
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("organizations").dropColumn("slug").execute();
}
