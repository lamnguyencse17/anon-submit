"use client";
import useUserStore from "@/stores/user";

const UnauthenticatedNav = () => {
  const shouldShowUnauthNav = useUserStore((state) => state.data == null);
  console.log(useUserStore((state) => state.data));
  if (shouldShowUnauthNav)
    return (
      <div className="flex flex-1 flex-row justify-end space-x-4 ">
        <a href="/register" className="hover:text-primary">
          Register
        </a>
        <a href="/login" className="hover:text-primary">
          Login
        </a>
      </div>
    );
  return null;
};

export default UnauthenticatedNav;
