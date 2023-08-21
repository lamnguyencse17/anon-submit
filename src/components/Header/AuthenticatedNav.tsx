"use client";
import userClientTranslation from "@/hooks/useClientTranslation";
import useUserStore from "@/stores/user";

const AuthenticatedNav = () => {
  const shouldShowAuthNav = useUserStore((state) => state.data != null);
  const { t } = userClientTranslation();
  if (shouldShowAuthNav)
    return (
      <div className="flex w-full flex-1 flex-row space-x-4 pl-12">
        <div className="flex-1">
          <a href="/organizations" className="hover:text-primary">
            {t("header.organizations")}
          </a>
        </div>
        <div className="justify-end">
          <a href="/logout" className="hover:text-primary">
            {t("header.logout")}
          </a>
        </div>
      </div>
    );
  return null;
};

export default AuthenticatedNav;
