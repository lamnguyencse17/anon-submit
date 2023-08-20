import { GetUserRecord } from "@/database/queries/users";
import useTokenStore, { StoredTokenData } from "@/stores/token";
import useUserStore from "@/stores/user";
import { useLayoutEffect } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";

const useAuth = (
  user?: CamelCasedPropertiesDeep<GetUserRecord>,
  tokenData?: StoredTokenData,
) => {
  useHandleUser(user);
  useHandleToken(tokenData);
};

const useHandleUser = (user?: CamelCasedPropertiesDeep<GetUserRecord>) => {
  const setUser = useUserStore((state) => state.setUser);
  const resetUser = useUserStore((state) => state.resetUser);

  const hasUser = !!user;

  useLayoutEffect(() => {
    if (hasUser) {
      setUser({ ...user, deletedAt: null });
      return;
    }
    resetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUser]);
};

const useHandleToken = (tokenData?: StoredTokenData) => {
  const setToken = useTokenStore((state) => state.setToken);
  const resetToken = useTokenStore((state) => state.resetToken);

  const hasTokenData = !!tokenData;
  const { token } = tokenData || {};

  useLayoutEffect(() => {
    if (hasTokenData) {
      setToken(tokenData);
      return;
    }
    resetToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasTokenData, token]);
};

export default useAuth;
