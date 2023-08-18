import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

const inter = Be_Vietnam_Pro({
  variable: "--be-vietnam-pro",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Anon Submit",
  description: "Your anonymous feedback form by lamnguyencse17",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex h-screen w-screen flex-col bg-primary">
      <body className={`${inter.className} flex h-full w-full flex-col`}>
        <Header />
        <div className="flex flex-1 flex-col px-8">{children}</div>
      </body>
    </html>
  );
}
