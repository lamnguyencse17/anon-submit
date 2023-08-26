import { OrganizationsRecord } from "@/database/queries/organizations";
import Image from "next/image";
import { FunctionComponent } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";
import EmptyIcon from "@/assets/empty.svg";
import { Spinner } from "@/components/Loading";
import OrganizationCard from "./OrganizationCard";

type OrganizationListProps = {
  organizations: CamelCasedPropertiesDeep<OrganizationsRecord>;
};

const OrganizationList: FunctionComponent<OrganizationListProps> = ({
  organizations,
}) => {
  return (
    <main className="mt-16 flex h-full flex-col items-center space-y-8 text-secondary">
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </main>
  );
};

export default OrganizationList;
