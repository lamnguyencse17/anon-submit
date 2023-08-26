import serverRequireAuthentication from "@/hooks/server/serverRequireAuthentication";
import { ReactNode } from "react";

const OrganizationsLayout = async ({ children }: { children: ReactNode }) => {
  await serverRequireAuthentication();
  return (
    <main className="mb-24 mt-12 flex h-full flex-col items-center space-y-8 text-secondary">
      {children}
    </main>
  );
};

export default OrganizationsLayout;
