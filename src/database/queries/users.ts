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
    const user = await genSharedGetByQuery()
      .where("id", "=", id)
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

export const getUserByEmail = async (email: string) => {
  try {
    const user = await genSharedGetByQuery()
      .where("email", "=", email)
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

export const genSharedGetByQuery = () => {
  return db
    .selectFrom("users")
    .select([
      "id",
      "name",
      "email",
      "hashed_password",
      "type",
      "created_at",
      "updated_at",
    ])
    .where("deleted_at", "is", null);
};
