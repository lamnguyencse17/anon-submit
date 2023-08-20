"use client";
import useClientTranslation from "@/hooks/useClientTranslation";
import useUserStore from "@/stores/user";

const UnauthenticatedNav = () => {
  const shouldShowUnauthNav = useUserStore((state) => state.data == null);
  const { t } = useClientTranslation();

  if (shouldShowUnauthNav)
    return (
      <div className="flex flex-1 flex-row justify-end space-x-4 ">
        <a href="/register" className="hover:text-primary">
          {t("header.register")}
        </a>
        <a href="/login" className="hover:text-primary">
          {t("header.login")}
        </a>
      </div>
    );
  return null;
};

export default UnauthenticatedNav;
