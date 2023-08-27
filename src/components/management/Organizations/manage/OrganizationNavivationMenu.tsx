import getServerTranslation from "@/hooks/server/getServerTranslation";
import Link from "next/link";
import { FunctionComponent } from "react";

type OrganizationNavigationMenuProps = { organizationId: number };

const OrganizationNavigationMenu: FunctionComponent<
  OrganizationNavigationMenuProps
> = async ({ organizationId }) => {
  const { t } = await getServerTranslation();
  return (
    <div className="flex w-full flex-row p-2">
      <div className="flex w-1/3  items-center justify-center">
        <Link
          href={`/organizations/manage/${organizationId}`}
          className="w-32 rounded-lg border border-dark bg-greeny p-2 text-center text-secondary hover:bg-light"
        >
          {t("manage_organization.info.nav_submissions")}
        </Link>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <Link
          href="#"
          className="w-32 rounded-lg border border-dark bg-light p-2 text-center text-dark hover:bg-primary hover:text-light"
        >
          {t("manage_organization.info.nav_members")}
        </Link>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <Link
          href="#"
          className="w-32 rounded-lg border border-dark bg-red-400 p-2 text-center text-light hover:bg-light hover:text-red-400"
        >
          {t("manage_organization.info.nav_settings")}
        </Link>
      </div>
    </div>
  );
};

export default OrganizationNavigationMenu;
