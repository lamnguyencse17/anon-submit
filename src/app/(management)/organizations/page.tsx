import EmptyOrgranizations from "@/components/management/Organizations/root/EmptyOrganizations";
import OrganizationList from "@/components/management/Organizations/root/OrganizationList";
import { dbGetOrganizationsByUserId } from "@/database/queries/organizations";
import serverRequireAuthentication from "@/hooks/server/serverRequireAuthentication";
import camelcaseKeys from "camelcase-keys";

const fetchOrganizations = async () => {
  const { user } = await serverRequireAuthentication();
  const fetchedOrganizations = await dbGetOrganizationsByUserId(user.id);
  return camelcaseKeys(fetchedOrganizations, { deep: true });
};

const OrganizationsPage = async () => {
  const organizations = await fetchOrganizations();
  if (organizations.length === 0) {
    return <EmptyOrgranizations />;
  }
  return <OrganizationList organizations={organizations} />;
};

export default OrganizationsPage;
