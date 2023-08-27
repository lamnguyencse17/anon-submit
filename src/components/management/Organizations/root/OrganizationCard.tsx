import { OrganizationsRecord } from "@/database/queries/organizations";
import Image from "next/image";
import { FunctionComponent } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";
import EmptyIcon from "@/assets/empty.svg";
import Link from "next/link";

type OrganizationCardProps = {
  organization: CamelCasedPropertiesDeep<OrganizationsRecord[0]>;
};

const OrganizationCard: FunctionComponent<OrganizationCardProps> = ({
  organization,
}) => {
  return (
    <div
      className="flex w-full flex-row items-center rounded-lg border border-dark bg-secondary text-light shadow hover:cursor-pointer hover:bg-greeny hover:text-secondary"
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
            className="rounded-l-lg rounded-r-none"
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
        <Link
          className="mb-2 text-2xl font-bold tracking-tight"
          href={`/organizations/manage/${organization.id}`}
          prefetch
        >
          {organization.name}
        </Link>
        {organization.description && (
          <p className="mb-3 font-normal ">{organization.description}</p>
        )}
        {organization.originalUrl && (
          <a
            className="mb-3 font-normal hover:text-dark hover:underline"
            href={organization.originalUrl}
          >
            {organization.originalUrl}
          </a>
        )}
      </div>
    </div>
  );
};

export default OrganizationCard;
