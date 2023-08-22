import getServerTranslation from "@/hooks/getServerTranslation";

const EmptyOrgranizations = async () => {
  const { t } = await getServerTranslation();
  return (
    <main className="mb-24 flex h-full flex-col items-center justify-center space-y-8 text-dark">
      <h1 className="text-center text-3xl font-bold">
        {t("organization_dashboard.empty.title")}
      </h1>
      <h2 className="text-center text-xl text-dark">
        {t("organization_dashboard.empty.description")}
      </h2>
      <a
        href="#"
        className="rounded-xl border border-dark bg-secondary px-8 py-4 font-semibold text-dark hover:bg-primary"
      >
        {t("organization_dashboard.empty.cta")}
      </a>
    </main>
  );
};

export default EmptyOrgranizations;
