"use server";
import { uploadImage } from "@/services/cloudinary";
import fs from "fs/promises";

const processUploadImage = async (cover: File) => {
  const coverBuffer = await cover.arrayBuffer();

  const tempPath = "/tmp/tmp.jpg";
  await fs.writeFile(tempPath, Buffer.from(coverBuffer));
  const uploadCoverResult = await uploadImage(tempPath);
  await fs.unlink(tempPath);
  return uploadCoverResult;
};

export const handleCreateOrganization = async (
  createOrganizationFormData: FormData,
) => {
  const creationData = Object.fromEntries(createOrganizationFormData.entries());
  // const coverFile = creationData.cover as unknown as File | undefined;
  // let coverUrl: string | undefined;
  // let imageId: string | undefined;
  // if (coverFile) {
  //   const uploadResult = await processUploadImage(coverFile);
  //   if (!uploadResult) {
  //     return {
  //       status: 500,
  //       message: "Something went wrong",
  //     };
  //   }
  //   coverUrl = uploadResult.secure_url;
  //   imageId = uploadResult.public_id;
  // }
};
