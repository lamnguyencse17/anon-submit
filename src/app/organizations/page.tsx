import EmptyOrgranizations from "@/components/Organizations/root/EmptyOrganizations";
import OrganizationList from "@/components/Organizations/root/OrganizationList";
import { dbGetOrganizationsByUserId } from "@/database/queries/organizations";
import serverHandleAuthentication from "@/utils/server/hooks/serverHandleAuthentication";
import camelcaseKeys from "camelcase-keys";
import { redirect } from "next/navigation";

const fetchOrganizations = async () => {
  const authData = await serverHandleAuthentication();
  const user = authData.user;
  if (!user) {
    redirect("/login");
  }
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
