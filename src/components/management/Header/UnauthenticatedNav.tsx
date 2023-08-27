"use client";
import useClientTranslation from "@/hooks/client/useClientTranslation";
import useUserStore from "@/stores/user";
import Link from "next/link";

const UnauthenticatedNav = () => {
  const shouldShowUnauthNav = useUserStore((state) => state.data == null);
  const { t } = useClientTranslation();

  if (shouldShowUnauthNav)
    return (
      <div className="flex flex-1 flex-row justify-end space-x-4 ">
        <Link href="/register" className="hover:text-greeny">
          {t("header.register")}
        </Link>
        <Link href="/login" className="hover:text-greeny">
          {t("header.login")}
        </Link>
      </div>
    );
  return null;
};

export default UnauthenticatedNav;
