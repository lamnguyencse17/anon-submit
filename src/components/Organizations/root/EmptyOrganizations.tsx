import getServerTranslation from "@/hooks/server/getServerTranslation";
import Link from "next/link";
import Image from "next/image";
import EmptyIcon from "@/assets/empty.svg";

const EmptyOrgranizations = async () => {
  const { t } = await getServerTranslation();
  return (
    <div className="-mt-8 flex h-full w-full flex-col items-center justify-center space-y-4">
      <Image
        src={EmptyIcon}
        alt="Empty organizations"
        width={200}
        height={200}
      />
      <h1 className="text-center text-3xl font-bold">
        {t("organization_dashboard.empty.title")}
      </h1>
      <h2 className="text-center text-xl text-secondary">
        {t("organization_dashboard.empty.description")}
      </h2>
      <Link
        href="/organizations/create"
        className="rounded-xl border border-dark bg-secondary px-8 py-4 font-semibold text-light hover:border-secondary hover:bg-greeny hover:text-secondary"
      >
        {t("organization_dashboard.empty.cta")}
      </Link>
    </div>
  );
};

export default EmptyOrgranizations;
