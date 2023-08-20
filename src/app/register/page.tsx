import { cookies } from "next/headers";
import { RegisterForm } from "./form";
import { redirect } from "next/navigation";
import getServerTranslation from "@/hooks/getServerTranslation";

const RegisterPage = async () => {
  const token = cookies().get("Authorization")?.value;
  if (token) {
    redirect("/");
  }
  const { t } = await getServerTranslation();
  return (
    <main className="flex flex-col items-center justify-center space-y-8">
      <h1>{t("register.title")}</h1>
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
