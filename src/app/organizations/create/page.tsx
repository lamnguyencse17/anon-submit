import getServerTranslation from "@/hooks/getServerTranslation";
import CreateOrganizationForm from "./form";

const CreateOrganizationPage = async () => {
  const { t } = await getServerTranslation();
  return (
    <main className="mb-24 flex h-full flex-col items-center justify-center space-y-8 text-secondary">
      <div>
        <h1 className="text-center text-3xl font-bold">
          {t("create_organization.title")}
        </h1>
        <h2 className="text-md text-center">
          {t("create_organization.subtitle")}
        </h2>
      </div>
      <CreateOrganizationForm />
    </main>
  );
};

export default CreateOrganizationPage;
