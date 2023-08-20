import { InsertObject } from "kysely";
import { db } from "../client";
import { DB } from "../database";

export const dbCreateUser = async (values: InsertObject<DB, "users">) => {
  try {
    const user = await db
      .insertInto("users")
      .values(values)
      .returningAll()
      .onConflict((oc) => oc.doNothing())
      .executeTakeFirst();

    if (!user) {
      return undefined;
    }
    return user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export type FullUserRecord = NonNullable<
  Awaited<ReturnType<typeof dbCreateUser>>
>;

export const getUserById = async (id: number) => {
  try {
    const user = await db
      .selectFrom("users")
      .select(["id", "name", "email", "type", "created_at", "updated_at"])
      .where("id", "=", id)
      .where("deleted_at", "is", null)
      .executeTakeFirst();
    if (!user) {
      return undefined;
    }
    return user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export type GetUserRecord = NonNullable<
  Awaited<ReturnType<typeof getUserById>>
>;
