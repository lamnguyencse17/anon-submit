import {
  dbGetOrganizationsByUserId,
  dbGetSingleOrganizationById,
  getOrganizationForCustomerFromSlug,
} from "@/database/queries/organizations";
import { getUserById } from "@/database/queries/users";
import camelcaseKeys from "camelcase-keys";
import { cache } from "react";

export const getOrganizationsFromUserIdWithCache = cache((userId: number) =>
  dbGetOrganizationsByUserId(userId),
);

export const getSingleOrganizationFromUserIdWithCache = cache(
  (userId: number, organizationId: number) =>
    dbGetSingleOrganizationById(organizationId, userId),
);

export const getUserWithCache = cache((userId: number) => getUserById(userId));

export const getOrganizationFromSlugWithCache = cache(async (slug: string) => {
  const organization = await getOrganizationForCustomerFromSlug(slug);
  if (!organization) return undefined;
  return camelcaseKeys(organization, { deep: true });
});
