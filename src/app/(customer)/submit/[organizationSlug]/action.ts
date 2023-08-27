"use server";

import { deleteImage, processUploadImage } from "@/utils/server/image";
import { SentSubmissionData, sentSubmissionSchema } from "./schema";
import { UploadApiResponse } from "cloudinary";
import { dbCreateSubmissions } from "@/database/queries/submissions";

export const handleSubmissionData = async (formData: FormData) => {
  const submissionData = Object.fromEntries(formData.entries()) as any;
  const attachments = formData.getAll("attachments");
  if (attachments.length > 0) {
    submissionData.attachments = attachments;
  }
  const validateResult = sentSubmissionSchema.safeParse(submissionData);
  if (!validateResult.success) {
    return {
      status: 400,
      message: validateResult.error.toString(),
    };
  }
  const submission = validateResult.data as SentSubmissionData;
  let uploadedImages: UploadApiResponse[] = [];
  if (submission.attachments && submission.attachments.length > 0) {
    const returnedImage = await Promise.allSettled(
      submission.attachments.map(processUploadImage),
    );
    if (returnedImage.some((result) => result.status !== "fulfilled")) {
      await Promise.all(
        uploadedImages
          .filter((image) => image)
          .map((image) => image && deleteImage(image.public_id)),
      );
      return {
        status: 500,
        message: "Something went wrong",
      };
    }
    uploadedImages = returnedImage.map(
      (result) => result.status === "fulfilled" && result.value,
    ) as UploadApiResponse[];
  }
  const createdSubmission = await dbCreateSubmissions(
    {
      content: submission.content,
      organization_id: submission.organizationId,
    },
    uploadedImages
      ? uploadedImages.map((image) => ({
          url: image.secure_url,
        }))
      : [],
  );
  if (!createdSubmission) {
    if (uploadedImages.length > 0) {
      await Promise.all(
        uploadedImages.map((image) => deleteImage(image.public_id)),
      );
    }
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
  return {
    status: 200,
    data: createdSubmission,
  };
};
