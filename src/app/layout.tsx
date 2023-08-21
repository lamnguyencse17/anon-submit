import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import RootHook from "@/components/RootHook";
import { dir } from "i18next";
import serverDetectLanguage from "@/utils/serverHook/serverDetectLanguage";
import serverHandleAuthentication from "@/utils/serverHook/serverHandleAuthentication";

const inter = Be_Vietnam_Pro({
  variable: "--be-vietnam-pro",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Anon Submit",
  description: "Your anonymous feedback form by lamnguyencse17",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await serverHandleAuthentication();
  const user = authData.user;
  const token = authData.token;
  const tokenPayload = authData.tokenData;
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
