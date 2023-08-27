import {
  getAllOrganizationSlugs,
  getOrganizationForCustomerFromSlug,
} from "@/database/queries/organizations";
import env from "@/utils/env";
import camelcaseKeys from "camelcase-keys";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import Logo from "@/assets/logo.svg";
import CustomerSubmissionForm from "./form";

const getOrganizationWithCache = cache(async (slug: string) => {
  const organization = await getOrganizationForCustomerFromSlug(slug);
  if (!organization) return undefined;
  return camelcaseKeys(organization, { deep: true });
});

// No SSG until this is resolve: https://github.com/vercel/next.js/issues/49408

// export const generateStaticParams = async () => {
//   const slugs = await getAllOrganizationSlugs();
//   return slugs.map((slug) => ({
//     ogranizationSlug: slug,
//   }));
// };

type CustomerSubmitPageParams = {
  params: {
    organizationSlug: string;
  };
};

export const generateMetadata = async ({
  params: { organizationSlug },
}: CustomerSubmitPageParams): Promise<Metadata> => {
  const organization = await getOrganizationWithCache(organizationSlug);
  if (!organization) return notFound();

  const title = `Send a message to ${organization.name}`;
  const description = "Your anonymous feedback form by lamnguyencse17";

  const metadata: Metadata = {
    title,
    description,
  };
  const openGraph: OpenGraph = {
    title,
    description,
    url: `${env("HOST")}/submit/${organizationSlug}`,
    siteName: "Anon Submit",
    type: "website",
    locale: "en_US",
  };

  if (organization.cover) {
    openGraph.images = {
      url: organization.cover,
      alt: title,
    };
  }
  metadata.openGraph = openGraph;
  metadata.title = title;
  return metadata;
};

const CustomerSubmitPage = async ({
  params: { organizationSlug },
}: CustomerSubmitPageParams) => {
  const organization = await getOrganizationWithCache(organizationSlug);
  if (!organization) return notFound();
  return (
    <div className="container mx-auto flex flex-col items-center space-y-6 px-4">
      {organization.cover ? (
        <Image
          src={organization.cover}
          alt={`Cover image of ${organization.name}`}
          width={200}
          height={200}
          className="rounded-lg"
        />
      ) : (
        <Image
          src={Logo}
          alt={`Cover image of ${organization.name}`}
          width={200}
          height={200}
        />
      )}
      <h1 className="text-2xl font-bold text-secondary">{organization.name}</h1>
      <CustomerSubmissionForm organizationId={organization.id} />
    </div>
  );
};

export default CustomerSubmitPage;
