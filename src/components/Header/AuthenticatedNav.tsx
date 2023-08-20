"use client";
import useUserStore from "@/stores/user";

const AuthenticatedNav = () => {
  const shouldShowAuthNav = useUserStore((state) => state.data != null);

  if (shouldShowAuthNav)
    return (
      <div className="flex flex-1 flex-row justify-end space-x-4">
        <a href="/logout">Logout</a>
      </div>
    );
  return null;
};

export default AuthenticatedNav;
