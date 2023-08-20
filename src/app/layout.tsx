import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { cookies } from "next/headers";
import RootHook from "@/components/RootHook";
import { decodeToken } from "@/utils/auth";
import { getUserById } from "@/database/queries/users";
import camelcaseKeys from "camelcase-keys";

const inter = Be_Vietnam_Pro({
  variable: "--be-vietnam-pro",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Anon Submit",
  description: "Your anonymous feedback form by lamnguyencse17",
};

const handleAuth = async () => {
  const token = cookies().get("Authorization")?.value;
  if (!token) {
    return undefined;
  }
  const decodedUser = await decodeToken(token);
  if (!decodedUser) {
    return undefined;
  }
  const user = await getUserById(decodedUser.id);
  if (!user) {
    return undefined;
  }
  return camelcaseKeys(user);
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await handleAuth();
  return (
    <html
      lang="en"
      className="flex h-screen w-screen flex-col items-center bg-primary font-vnpro"
    >
      <body
        className={`${inter.className} flex h-full w-full flex-col items-center`}
      >
        <RootHook user={user} />
        <Header />
        <div className="container flex flex-1 flex-col px-8">{children}</div>
      </body>
    </html>
  );
}
