import { RegisterForm } from "./form";
import { redirect } from "next/navigation";
import getServerTranslation from "@/hooks/getServerTranslation";
import serverHandleAuthentication from "@/utils/serverHook/serverHandleAuthentication";

const RegisterPage = async () => {
  const { token, user } = await serverHandleAuthentication();
  if (token && user) {
    redirect("/");
  }
  const { t } = await getServerTranslation();
  return (
    <main className="mb-24 flex h-full flex-col items-center justify-center space-y-8">
      <h1 className="text-bold text-2xl text-secondary">
        {t("register.title")}
      </h1>
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
