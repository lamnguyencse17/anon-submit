import Image from "next/image";
import Logo from "@/assets/logo.svg";
import SimpleIcon from "@/assets/simple.svg";
import PowerfulIcon from "@/assets/powerful.svg";
import AnonymousIcon from "@/assets/anonymous.svg";
import getServerTranslation from "@/hooks/server/getServerTranslation";

export default async function Home() {
  const { t } = await getServerTranslation();
  return (
    <main className="mb-24 mt-8 flex h-full w-full flex-col items-center px-4 text-secondary">
      <div className="flex w-full flex-row items-center justify-center px-32">
        <Image src={Logo} alt="AnonSubmit Logo" width={200} height={200} />
        <h1 className="h-fit px-8 text-3xl">{t("landing.title")}</h1>
      </div>
      <div className="mt-12 flex w-full flex-1 flex-row space-x-2">
        <div className="flex h-full w-1/3 flex-col items-center">
          <h2 className="text-2xl">{t("landing.property_simple")}</h2>
          <h3 className="mt-4 flex-1 text-center text-xl">
            {t("landing.property_simple_description")}
          </h3>
          <Image
            src={SimpleIcon}
            alt="AnonSubmit Logo"
            width={100}
            height={100}
            className="mb-16"
          />
        </div>
        <div className="flex h-full w-1/3 flex-col items-center">
          <h2 className="text-2xl">{t("landing.property_powerful")}</h2>
          <h3 className="mt-4 flex-1 text-center text-xl">
            {t("landing.property_powerful_description")}
          </h3>
          <Image
            src={PowerfulIcon}
            alt="AnonSubmit Logo"
            width={100}
            height={100}
            className="mb-16"
          />
        </div>
        <div className="flex h-full w-1/3 flex-col items-center">
          <h2 className="text-2xl">{t("landing.property_anonymous")}</h2>
          <h3 className="mt-4 flex-1 text-center text-xl">
            {t("landing.property_anonymous_description")}
          </h3>
          <Image
            src={AnonymousIcon}
            alt="AnonSubmit Logo"
            width={100}
            height={100}
            className="mb-16"
          />
        </div>
      </div>
    </main>
  );
}
