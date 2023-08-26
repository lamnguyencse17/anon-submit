import { OrganizationsRecord } from "@/database/queries/organizations";
import Image from "next/image";
import { FunctionComponent } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";
import EmptyIcon from "@/assets/empty.svg";
import { Spinner } from "@/components/Loading";
import OrganizationCard from "./OrganizationCard";
import getServerTranslation from "@/hooks/server/getServerTranslation";

type OrganizationListProps = {
  organizations: CamelCasedPropertiesDeep<OrganizationsRecord>;
};

const OrganizationList: FunctionComponent<OrganizationListProps> = async ({
  organizations,
}) => {
  const { t } = await getServerTranslation();
  return (
    <>
      <h2 className="text-2xl font-bold text-secondary">
        {t("organization_dashboard.list.title")}
      </h2>
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </>
  );
};

export default OrganizationList;
