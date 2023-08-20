"use client";
import useUserStore from "@/stores/user";

const AuthenticatedNav = () => {
  const shouldShowAuthNav = useUserStore((state) => state.data != null);

  if (shouldShowAuthNav)
    return (
      <div className="flex w-full flex-1 flex-row space-x-4 pl-12">
        <div className="flex-1">
          <a href="/logout" className="hover:text-primary">
            Organizations
          </a>
        </div>
        <div className="justify-end">
          <a href="/logout" className="hover:text-primary">
            Logout
          </a>
        </div>
      </div>
    );
  return null;
};

export default AuthenticatedNav;
