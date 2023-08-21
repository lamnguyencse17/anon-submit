import serverRequireAuthentication from "@/utils/serverHook/serverRequireAuthentication";
import { ReactNode } from "react";

const OrganizationsLayout = async ({ children }: { children: ReactNode }) => {
  await serverRequireAuthentication();
  return <>{children}</>;
};

export default OrganizationsLayout;
