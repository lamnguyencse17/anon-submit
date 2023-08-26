import OrganizationInfo from "@/components/Organizations/manage/OrganizationInfo";
import serverValidateOrganizationAccess from "@/hooks/server/serverValidateOrganizationAccess";
import { FunctionComponent } from "react";

type ManageOrganizationLayoutProps = {
  children: React.ReactNode;
  params: {
    organizationId: string;
  };
};

const ManageOrganizationLayout: FunctionComponent<
  ManageOrganizationLayoutProps
> = async ({ children, params: { organizationId } }) => {
  const organization = await serverValidateOrganizationAccess(organizationId);
  return (
    <div className="flex h-full w-full flex-col space-y-4">
      <OrganizationInfo organization={organization} />
      {children}
    </div>
  );
};

export default ManageOrganizationLayout;
