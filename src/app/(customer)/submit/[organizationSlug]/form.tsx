"use client";

import useClientTranslation from "@/hooks/client/useClientTranslation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { CreateSubmissionData, createSubmissionsSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useMemo } from "react";
import ImagePreviews from "@/components/ImagePreviews";
import { compressImage } from "@/utils/image";
import { handleSubmissionData } from "./action";
import { SUCCESSFUL_STATUS } from "@/constants/status";
import { useRouter } from "next/navigation";

type CustomerSubmissionFormProps = {
  organizationId: number;
};

const CustomerSubmissionForm: FunctionComponent<
  CustomerSubmissionFormProps
> = ({ organizationId }) => {
  const { t } = useClientTranslation();
  const { pending } = useFormStatus();
  const router = useRouter();
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
    watch,
  } = useForm<CreateSubmissionData>({
    resolver: zodResolver(createSubmissionsSchema as any),
  });

  const rawAttachments = watch("attachments");
  const attachments = useMemo(
    () => Array.from(rawAttachments || []),
    [rawAttachments],
  );

  return (
    <form
      className="flex w-2/3 flex-col items-center"
      action={async () => {
        const isValid = await trigger();
        if (!isValid) return;
        const createSubmissionData = getValues();
        const formData = new FormData();
        Object.keys(createSubmissionData).forEach((key) => {
          if (key === "attachments") {
            return;
          }
          formData.append(
            key,
            createSubmissionData[key as keyof CreateSubmissionData] as string,
          );
        });
        if (createSubmissionData.attachments) {
          const attachmentList = createSubmissionData["attachments"];
          const compressedImages = await Promise.all(
            Array.from(attachmentList).map((file) => {
              return compressImage(file);
            }),
          );
          compressedImages.forEach((image) => {
            formData.append("attachments", image);
          });
        }
        formData.append("organizationId", organizationId.toString());
        const submissionResponse = await handleSubmissionData(formData);
        if (submissionResponse.status === SUCCESSFUL_STATUS) {
          const submission = submissionResponse.data;
          if (!submission) return;
          router.push(`/submit/tracking/${submission.id}`);
        }
      }}
    >
      <textarea
        {...register("content")}
        className="w-full rounded-lg border border-greeny p-4 focus:outline-secondary"
        rows={5}
        placeholder={t("customer.submission.textbox_placeholder")}
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.content?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.content?.message?.toString() || "holder"}
      </p>
      <input
        {...register("attachments")}
        type="file"
        className="w-full rounded border border-secondary p-2 placeholder:text-greeny focus:outline-dark"
        accept=".png,.jpeg,.webp,.jpg"
        multiple
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.attachments?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.attachments?.message?.toString() || "holder"}
      </p>
      <div className="flex w-full flex-row flex-wrap space-x-2">
        <ImagePreviews images={attachments} />
      </div>
      <button
        className="mt-8 rounded-lg border border-secondary bg-secondary px-8 py-4 text-light shadow hover:bg-greeny hover:text-secondary"
        type="submit"
        disabled={pending}
      >
        {t("customer.submission.cta")}
      </button>
    </form>
  );
};

export default CustomerSubmissionForm;
