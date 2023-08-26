import { FunctionComponent } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";
import { OrganizationSingleRecord } from "@/database/queries/organizations";
import Image from "next/image";
import EmptyIcon from "@/assets/empty.svg";
import getServerTranslation from "@/hooks/server/getServerTranslation";
import OrganizationNavigationMenu from "./OrganizationNavivationMenu";

type OrganizationInfoProps = {
  organization: CamelCasedPropertiesDeep<OrganizationSingleRecord>;
};

const OrganizationInfo: FunctionComponent<OrganizationInfoProps> = async ({
  organization,
}) => {
  const { t } = await getServerTranslation();
  return (
    <div className="-mt-8 flex w-full flex-col items-center rounded-lg border border-dark bg-secondary text-light shadow">
      <div className="flex w-full flex-row items-center border-b-2 border-b-light">
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
          <h1 className="mb-2 text-2xl font-bold tracking-tight">
            {organization.name}
          </h1>
          {organization.description && (
            <p className="font-normal">
              {t("manage_organization.info.description")}
              {organization.description}
            </p>
          )}
          {organization.originalUrl && (
            <div>
              {t("manage_organization.info.original_url")}
              <a
                className="font-normal hover:text-dark hover:underline"
                href={organization.originalUrl}
              >
                {organization.originalUrl}
              </a>
            </div>
          )}
        </div>
      </div>
      <OrganizationNavigationMenu organizationId={organization.id} />
    </div>
  );
};

export default OrganizationInfo;
