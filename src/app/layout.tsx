import "./globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { dir } from "i18next";
import serverDetectLanguage from "@/hooks/server/serverDetectLanguage";

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
  const language = serverDetectLanguage();

  return (
    <html
      lang={language}
      dir={dir(language)}
      className="flex h-screen w-screen flex-col items-center bg-light font-vnpro"
    >
      <body
        className={`${inter.className} flex h-full w-full flex-col items-center`}
      >
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
