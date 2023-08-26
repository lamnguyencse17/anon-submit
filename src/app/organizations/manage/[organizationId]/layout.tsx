import OrganizationInfo from "@/components/Organizations/manage/OrganizationInfo";
import { FunctionComponent } from "react";

type ManageOrganizationLayoutProps = {
  children: React.ReactNode;
  params: {
    organizationId: string;
  };
};

const ManageOrganizationLayout: FunctionComponent<
  ManageOrganizationLayoutProps
> = ({ children, params: { organizationId } }) => {
  return (
    <div className="flex h-full w-full flex-col space-y-4">
      <OrganizationInfo organizationId={parseInt(organizationId)} />
      {children}
    </div>
  );
};

export default ManageOrganizationLayout;
