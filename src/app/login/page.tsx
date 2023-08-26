import { redirect } from "next/navigation";
import { LoginForm } from "./form";
import getServerTranslation from "@/hooks/server/getServerTranslation";
import serverHandleAuthentication from "@/hooks/server/serverHandleAuthentication";

const loginPage = async () => {
  const { token, user } = await serverHandleAuthentication();
  if (token && user) {
    redirect("/");
  }
  const { t } = await getServerTranslation();
  return (
    <main className="mb-24 flex h-full flex-col items-center justify-center space-y-8">
      <h1 className="text-bold text-2xl text-secondary">{t("login.title")}</h1>
      <LoginForm />
    </main>
  );
};

export default loginPage;
