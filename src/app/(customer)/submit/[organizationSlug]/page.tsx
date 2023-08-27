import {
  getAllOrganizationSlugs,
  getOrganizationForCustomerFromSlug,
} from "@/database/queries/organizations";
import { cache } from "react";

const getOrganizationWithCache = cache(async (slug: string) =>
  getOrganizationForCustomerFromSlug(slug),
);

export const generateStaticParams = async () => {
  const slugs = await getAllOrganizationSlugs();
  return slugs.map((slug) => ({
    ogranizationSlug: slug,
  }));
};

type CustomerSubmitPageParams = {
  params: {
    organizationSlug: string;
  };
};

export const generateMetadata = async ({
  params: { organizationSlug },
}: CustomerSubmitPageParams) => {
  const sharedMetadata = {
    title: "Anon Submit",
    description:
      "Your anonymous feedback form powered by Anon Submit and built by lamnguyencse17",
  };
  const organization = await getOrganizationWithCache(organizationSlug);
  if (!organization) return sharedMetadata;
  return { ...sharedMetadata, title: `Send a message to ${organization.name}` };
};

const CustomerSubmitPage = async ({
  params: { organizationSlug },
}: CustomerSubmitPageParams) => {
  const organization = await getOrganizationWithCache(organizationSlug);
  return (
    <div>
      <h1>Customer Submit Page</h1>
    </div>
  );
};

export default CustomerSubmitPage;
