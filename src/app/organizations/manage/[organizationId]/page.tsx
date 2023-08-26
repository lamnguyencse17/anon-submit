import { FunctionComponent } from "react";

type OrganizationManagePageProps = {
  params: {
    organizationId: string;
  };
};

const OrganizationManagePage: FunctionComponent<
  OrganizationManagePageProps
> = ({ params: { organizationId } }) => {
  return <div></div>;
};

export default OrganizationManagePage;
