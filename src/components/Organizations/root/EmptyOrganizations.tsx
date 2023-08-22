import getServerTranslation from "@/hooks/getServerTranslation";
import Link from "next/link";

const EmptyOrgranizations = async () => {
  const { t } = await getServerTranslation();
  return (
    <main className="mb-24 flex h-full flex-col items-center justify-center space-y-8 text-secondary">
      <h1 className="text-center text-3xl font-bold">
        {t("organization_dashboard.empty.title")}
      </h1>
      <h2 className="text-center text-xl text-secondary">
        {t("organization_dashboard.empty.description")}
      </h2>
      <Link
        href="/organizations/create"
        className="text-light hover:bg-greeny rounded-xl border border-dark bg-secondary px-8 py-4 font-semibold hover:border-secondary hover:text-secondary"
      >
        {t("organization_dashboard.empty.cta")}
      </Link>
    </main>
  );
};

export default EmptyOrgranizations;
