import { dbGetSingleOrganizationById } from "@/database/queries/organizations";
import serverHandleAuthentication from "@/hooks/server/serverHandleAuthentication";
import { FunctionComponent } from "react";
import OrganizationCard from "../root/OrganizationCard";
import camelcaseKeys from "camelcase-keys";

type OrganizationInfoProps = {
  organizationId: number;
};

const OrganizationInfo: FunctionComponent<OrganizationInfoProps> = async ({
  organizationId,
}) => {
  const { user } = await serverHandleAuthentication();
  if (!user) {
    return null;
  }
  const rawOrganization = await dbGetSingleOrganizationById(
    organizationId,
    user.id,
  );
  if (!rawOrganization) {
    return null;
  }
  const organization = camelcaseKeys(rawOrganization, { deep: true });
  return <OrganizationCard organization={organization} />;
};

export default OrganizationInfo;
