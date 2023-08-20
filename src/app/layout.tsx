import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { cookies, headers } from "next/headers";
import RootHook from "@/components/RootHook";
import { decodeToken } from "@/utils/auth";
import { getUserById } from "@/database/queries/users";
import camelcaseKeys from "camelcase-keys";
import { fallbackLng } from "./i18n/settings";
import { dir } from "i18next";
import languageParser from "accept-language-parser";
import serverDetectLanguage from "@/utils/serverDetectLanguage";

const inter = Be_Vietnam_Pro({
  variable: "--be-vietnam-pro",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["vietnamese"],
});

const handleAuth = async () => {
  const token = cookies().get("Authorization")?.value;
  if (!token) {
    return {};
  }
  const tokenData = await decodeToken(token);
  if (!tokenData) {
    return {};
  }
  const user = await getUserById(tokenData.user.id);
  if (!user) {
    return {};
  }
  return { user: camelcaseKeys(user), tokenPayload: tokenData, token };
};

export const metadata: Metadata = {
  title: "Anon Submit",
  description: "Your anonymous feedback form by lamnguyencse17",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token, tokenPayload } = await handleAuth();
  const language = serverDetectLanguage();

  return (
    <html
      lang={language}
      dir={dir(language)}
      className="flex h-screen w-screen flex-col items-center bg-primary font-vnpro"
    >
      <body
        className={`${inter.className} flex h-full w-full flex-col items-center`}
      >
        <RootHook
          user={user}
          tokenData={{ ...tokenPayload, token }}
          language={language}
        />
        <Header />
        <div className="container flex flex-1 flex-col px-8">{children}</div>
      </body>
    </html>
  );
}
