import { GetUserRecord } from "@/database/queries/users";
import useUserStore from "@/stores/user";
import { useEffect } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";

const useAuth = (user?: CamelCasedPropertiesDeep<GetUserRecord>) => {
  const setUser = useUserStore((state) => state.setUser);
  const resetUser = useUserStore((state) => state.resetUser);
  const hasUser = !!user;
  useEffect(() => {
    if (hasUser) {
      setUser({ ...user, deletedAt: null });
    }
    resetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUser]);
};

export default useAuth;
