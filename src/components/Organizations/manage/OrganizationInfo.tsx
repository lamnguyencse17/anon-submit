import { FunctionComponent } from "react";
import OrganizationCard from "../root/OrganizationCard";
import { CamelCasedPropertiesDeep } from "type-fest";
import { OrganizationSingleRecord } from "@/database/queries/organizations";

type OrganizationInfoProps = {
  organization: CamelCasedPropertiesDeep<OrganizationSingleRecord>;
};

const OrganizationInfo: FunctionComponent<OrganizationInfoProps> = async ({
  organization,
}) => {
  return <OrganizationCard organization={organization} />;
};

export default OrganizationInfo;
