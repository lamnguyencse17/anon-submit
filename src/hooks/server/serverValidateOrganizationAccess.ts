import { dbGetSingleOrganizationById } from "@/database/queries/organizations";
import camelcaseKeys from "camelcase-keys";
import serverRequireAuthentication from "./serverRequireAuthentication";
import { redirect } from "next/navigation";

const serverValidateOrganizationAccess = async (organizationId: string) => {
  const { user } = await serverRequireAuthentication();
  const parsedOrganizationId = parseInt(organizationId);
  if (Number.isNaN(parsedOrganizationId)) {
    return redirect("/organizations");
  }
  const rawOrganization = await dbGetSingleOrganizationById(
    parsedOrganizationId,
    user.id,
  );
  if (!rawOrganization) {
    return redirect("/organizations");
  }
  const organization = camelcaseKeys(rawOrganization, { deep: true });
  return organization;
};

export default serverValidateOrganizationAccess;
