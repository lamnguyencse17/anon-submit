import { redirect } from "next/navigation";
import serverHandleAuthentication from "./serverHandleAuthentication";

const serverRequireAuthentication = async () => {
  const { user, token } = await serverHandleAuthentication();
  if (!user || !token) {
    redirect("/login");
  }
};

export default serverRequireAuthentication;
