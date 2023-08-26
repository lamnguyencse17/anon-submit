import { redirect } from "next/navigation";
import serverHandleAuthentication from "./serverHandleAuthentication";

const serverRequireAuthentication = async () => {
  const { user, token, tokenData } = await serverHandleAuthentication();
  if (!user || !token || !tokenData) {
    redirect("/login");
  }
  return { user, token, tokenData };
};

export default serverRequireAuthentication;
