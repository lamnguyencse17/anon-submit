import { cookies } from "next/headers";
import { RegisterForm } from "./form";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const token = cookies().get("Authorization")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <main className="flex flex-col items-center justify-center space-y-8">
      <h1>Let&apos;s get started!</h1>
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
