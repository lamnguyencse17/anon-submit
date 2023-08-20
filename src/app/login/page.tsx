import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./form";

const loginPage = () => {
  const token = cookies().get("Authorization")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <main className="flex flex-col items-center justify-center space-y-8">
      <h1>Let&apos;s get started!</h1>
      <LoginForm />
    </main>
  );
};

export default loginPage;
