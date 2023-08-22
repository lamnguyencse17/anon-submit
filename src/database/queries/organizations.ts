import { InsertObject } from "kysely";
import { db } from "../client";
import { DB } from "../database";

export const dbCreateNewOrganization = async (
  userId: number,
  values: InsertObject<DB, "organizations">,
) => {
  try {
    const createdOrganization = await db.transaction().execute(async (trx) => {
      const newOrganization = await trx
        .insertInto("organizations")
        .values(values)
        .returningAll()
        .executeTakeFirst();
      if (!newOrganization) {
        throw new Error("Failed to create new organization");
      }
      const userOrganization = await trx
        .insertInto("user_organization")
        .values({
          organization_id: newOrganization.id,
          user_id: userId,
        })
        .returningAll()
        .executeTakeFirst();
      return userOrganization;
    });
    if (!createdOrganization) {
      return undefined;
    }
    return createdOrganization;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export type CreatedOrganizationRecord = NonNullable<
  Awaited<ReturnType<typeof dbCreateNewOrganization>>
>;

export const dbGetOrganizationsByUserId = async (userId: number) => {
  try {
    const organizations = await db
      .selectFrom("user_organization")
      .where("user_id", "=", userId)
      .innerJoin("organizations", "organizations.id", "user_organization.id")
      .selectAll()
      .execute();
    return organizations;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export type OrganizationsRecord = NonNullable<
  Awaited<ReturnType<typeof dbGetOrganizationsByUserId>>
>;
