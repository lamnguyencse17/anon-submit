import Header from "@/components/management/Header";
import "../globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import RootHook from "@/components/management/RootHook";
import serverDetectLanguage from "@/hooks/server/serverDetectLanguage";
import serverHandleAuthentication from "@/hooks/server/serverHandleAuthentication";

const inter = Be_Vietnam_Pro({
  variable: "--be-vietnam-pro",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Anon Submit",
  description: "Your anonymous feedback form by lamnguyencse17",
};

export default async function ManagementGroupRootLayout({
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
    <>
      <RootHook
        user={user}
        tokenData={{ ...tokenPayload, token }}
        language={language}
      />
      <Header />
      <div className="container flex flex-1 flex-col px-16">{children}</div>
    </>
  );
}
