"use client";
import useUserStore from "@/stores/user";

const UnauthenticatedNav = () => {
  const shouldShowUnauthNav = useUserStore((state) => state.data == null);

  if (shouldShowUnauthNav)
    return (
      <div className="flex flex-1 flex-row justify-end space-x-4">
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </div>
    );
  return null;
};

export default UnauthenticatedNav;
