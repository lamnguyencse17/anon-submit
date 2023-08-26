import { OrganizationsRecord } from "@/database/queries/organizations";
import Image from "next/image";
import { FunctionComponent } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";
import EmptyIcon from "@/assets/empty.svg";

type OrganizationCardProps = {
  organization: CamelCasedPropertiesDeep<OrganizationsRecord[0]>;
};

const OrganizationCard: FunctionComponent<OrganizationCardProps> = ({
  organization,
}) => {
  return (
    <a
      href={`/organizations/manage/${organization.id}`}
      className="flex w-full flex-row items-center rounded-lg border border-dark bg-secondary text-light shadow hover:bg-greeny hover:text-secondary"
      key={organization.id}
    >
      <div className="rounder-lg relative flex h-48 w-48 items-center justify-center">
        {organization.cover ? (
          <Image
            src={organization.cover}
            alt={`Cover image of ${organization.name}`}
            fill={true}
            priority={false}
            loading="lazy"
          />
        ) : (
          <div className="rounder-lg flex h-full w-full items-center justify-center   bg-light px-2">
            <Image
              src={EmptyIcon}
              alt=""
              priority={false}
              loading="lazy"
            ></Image>
          </div>
        )}
      </div>

      <div className="flex h-full w-full flex-col justify-center p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight ">
          {organization.name}
        </h5>
        {organization.description && (
          <p className="mb-3 font-normal ">{organization.description}</p>
        )}
      </div>
    </a>
  );
};

export default OrganizationCard;
