"use client";
import useUserStore from "@/stores/user";

const UnauthenticatedNav = () => {
  const shouldShowAuthNav = useUserStore((state) => state.data == null);

  if (shouldShowAuthNav)
    return (
      <div className="flex flex-1 flex-row justify-end space-x-4">
        <a href="/register">Register</a>
        <a href="#">Login</a>
      </div>
    );
  return null;
};

export default UnauthenticatedNav;
