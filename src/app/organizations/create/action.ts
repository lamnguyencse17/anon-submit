"use server";
import { dbCreateNewOrganization } from "@/database/queries/organizations";
import serverHandleAuthentication from "@/hooks/server/serverHandleAuthentication";
import { receivedCreateOrganizationSchema } from "./schema";
import camelcaseKeys from "camelcase-keys";
import { deleteImage, processUploadImage } from "@/utils/server/image";

const undoAction = async (imageId: string) => {
  try {
    await deleteImage(imageId);
    return true;
  } catch {
    return false;
  }
};

export const handleCreateOrganization = async (
  createOrganizationFormData: FormData,
) => {
  const { user, token } = await serverHandleAuthentication();
  if (!user || !token) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }
  const creationData = Object.fromEntries(createOrganizationFormData.entries());
  console.log(creationData);
  Object.keys(creationData).forEach((key) => {
    if (creationData[key] === "") {
      delete creationData[key];
    }
  });
  const validationResult =
    receivedCreateOrganizationSchema.safeParse(creationData);
  if (!validationResult.success) {
    return {
      status: 400,
      message: validationResult.error,
    };
  }
  const validatedData = validationResult.data;
  const coverFile = validatedData.cover as unknown as File | undefined;
  let coverUrl: string | undefined;
  let imageId: string | undefined;
  if (coverFile) {
    const uploadResult = await processUploadImage(coverFile);
    if (!uploadResult) {
      return {
        status: 500,
        message: "Something went wrong",
      };
    }
    coverUrl = uploadResult.secure_url;
    imageId = uploadResult.public_id;
  }
  const createOrganizationResult = await dbCreateNewOrganization(user.id, {
    owned_by: user.id,
    name: validatedData.name,
    description: validatedData.description,
    cover: coverUrl,
    original_url: validatedData.originalUrl,
  });
  if (!createOrganizationResult) {
    if (imageId) {
      const undoResult = await undoAction(imageId);
      if (!undoResult) {
        console.log("UNDO ACTION FAILED");
      }
    }
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
  return {
    status: 200,
    data: camelcaseKeys(createOrganizationResult, { deep: true }),
  };
};
