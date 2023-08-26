"use client";
import useClientTranslation from "@/hooks/client/useClientTranslation";
import { useForm } from "react-hook-form";
import { CreateOrganizationData, createOrganizationSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { handleCreateOrganization } from "./action";
import { SUCCESSFUL_STATUS } from "@/constants/status";
import { useRouter } from "next/navigation";
import { compressImage } from "@/utils/image";

const CreateOrganizationForm = () => {
  const { t } = useClientTranslation();
  const { pending } = useFormStatus();
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<CreateOrganizationData>({
    resolver: zodResolver(createOrganizationSchema as any),
  });
  const router = useRouter();
  return (
    <form
      className="flex w-2/3 flex-col"
      action={async () => {
        const isValid = await trigger();
        if (!isValid) return;
        const createOrganizationData = getValues();
        const formData = new FormData();
        Object.keys(createOrganizationData).forEach((key) => {
          if (key === "cover" && createOrganizationData["cover"]) {
            return;
          }
          formData.append(
            key,
            createOrganizationData[
              key as keyof CreateOrganizationData
            ] as string,
          );
        });
        if (createOrganizationData.cover) {
          const coverFileList = createOrganizationData["cover"] as FileList;
          const orginalCoverFile = coverFileList[0];
          if (orginalCoverFile) {
            const compressedImage = await compressImage(orginalCoverFile);
            formData.append("cover", compressedImage);
          }
        }
        const response = await handleCreateOrganization(formData);
        if (response.status === SUCCESSFUL_STATUS) {
          const organizationData = response.data;
          if (!organizationData) return;
          router.push(`/organizations/manage/${organizationData.id}`);
        }
      }}
    >
      <input
        {...register("name")}
        placeholder={t("create_organization.placeholder.name")}
        type="text"
        className="w-full rounded border border-secondary p-2 placeholder:text-greeny focus:outline-dark"
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.name?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.name?.message || "holder"}
      </p>
      <input
        {...register("originalUrl")}
        placeholder={t("create_organization.placeholder.url")}
        type="url"
        className="w-full rounded border border-secondary p-2 placeholder:text-greeny focus:outline-dark"
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.originalUrl?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.originalUrl?.message || "holder"}
      </p>
      <textarea
        {...register("description")}
        placeholder={t("create_organization.placeholder.description")}
        className="w-full rounded border border-secondary p-2 placeholder:text-greeny focus:outline-dark"
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.description?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.description?.message || "holder"}
      </p>
      <input
        {...register("cover")}
        type="file"
        className="w-full rounded border border-secondary p-2 placeholder:text-greeny focus:outline-dark"
        accept=".png,.jpeg,.webp,.jpg"
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.cover?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.cover?.message?.toString() || "holder"}
      </p>
      <button
        type="submit"
        className="border-1 mx-auto mt-4 w-1/4 rounded border border-secondary bg-secondary p-2 text-light hover:border hover:border-secondary hover:bg-light hover:text-secondary"
        disabled={pending}
      >
        {t("create_organization.cta")}
      </button>
    </form>
  );
};

export default CreateOrganizationForm;
