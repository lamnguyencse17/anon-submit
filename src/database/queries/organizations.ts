import { InsertObject } from "kysely";
import { db } from "../client";
import { DB } from "../database";
import slugify from "@/utils/slugify";
import { nanoid } from "nanoid/async";

export const dbCreateNewOrganization = async (
  userId: number,
  values: Omit<InsertObject<DB, "organizations">, "slug">,
) => {
  try {
    let slug = slugify(values.name as string);
    const createdOrganization = await db.transaction().execute(async (trx) => {
      const doesSlugExist = await trx
        .selectFrom("organizations")
        .where("slug", "=", slug)
        .select("id")
        .execute();
      if (doesSlugExist) {
        const randomPrefix = await nanoid(8);
        slug = slugify(`${values.name}-${randomPrefix}`);
      }
      const newOrganization = await trx
        .insertInto("organizations")
        .values({ ...values, slug })
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

export const dbGetSingleOrganizationById = async (
  id: number,
  userId: number,
) => {
  try {
    const organization = await db
      .selectFrom("organizations")
      .where("organizations.id", "=", id)
      .innerJoin(
        "user_organization",
        "user_organization.organization_id",
        "organizations.id",
      )
      .where("user_organization.user_id", "=", userId)
      .selectAll()
      .executeTakeFirst();
    return organization;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export type OrganizationSingleRecord = NonNullable<
  Awaited<ReturnType<typeof dbGetSingleOrganizationById>>
>;

export const getAllOrganizationSlugs = async () => {
  try {
    const organizations = await db
      .selectFrom("organizations")
      .select("slug")
      .execute();
    return organizations;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getOrganizationForCustomerFromSlug = async (slug: string) => {
  try {
    const organization = await db
      .selectFrom("organizations")
      .where("slug", "=", slug)
      .select(["id", "name", "description", "cover", "original_url", "slug"])
      .executeTakeFirst();
    return organization;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export type OrganizationSingleRecordForCustomer = NonNullable<
  Awaited<ReturnType<typeof getOrganizationForCustomerFromSlug>>
>;
