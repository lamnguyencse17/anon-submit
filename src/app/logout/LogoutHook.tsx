"use client";

import { SUCCESSFUL_STATUS } from "@/constants/status";
import useUserStore from "@/stores/user";
import { useRouter } from "next/navigation";
import { FunctionComponent, useCallback, useEffect } from "react";

type LogoutHookProps = {
  logout: () => Promise<{ status: number }>;
};

const LogoutHook: FunctionComponent<LogoutHookProps> = ({ logout }) => {
  const resetUser = useUserStore((state) => state.resetUser);
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    const { status } = await logout();
    if (status === SUCCESSFUL_STATUS) {
      resetUser();
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default LogoutHook;
