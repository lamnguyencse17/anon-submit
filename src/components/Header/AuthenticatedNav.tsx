"use client";
import userClientTranslation from "@/hooks/useClientTranslation";
import useUserStore from "@/stores/user";
import Link from "next/link";

const AuthenticatedNav = () => {
  const shouldShowAuthNav = useUserStore((state) => state.data != null);
  const { t } = userClientTranslation();
  if (shouldShowAuthNav)
    return (
      <div className="flex w-full flex-1 flex-row space-x-4 pl-12">
        <div className="flex-1">
          <Link href="/organizations" className="hover:text-greeny" prefetch>
            {t("header.organizations")}
          </Link>
        </div>
        <div className="justify-end">
          <Link href="/logout" className="hover:text-greeny">
            {t("header.logout")}
          </Link>
        </div>
      </div>
    );
  return null;
};

export default AuthenticatedNav;
