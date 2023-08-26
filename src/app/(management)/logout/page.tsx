import { cookies } from "next/headers";
import LogoutHook from "./LogoutHook";

const logout = async () => {
  "use server";
  cookies().delete("Authorization");
  return {
    status: 200,
  };
};

const LogoutPage = () => {
  return <LogoutHook logout={logout} />;
};

export default LogoutPage;
