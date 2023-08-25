import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "@/services/cloudinary";
import fs from "fs/promises";
import { nanoid } from "nanoid/async";
import mime from "mime-types";

export const processUploadImage = async (image: File) => {
  const extension = mime.extension(image.type);
  if (!extension) {
    return undefined;
  }
  const coverBuffer = await image.arrayBuffer();
  const tempFileName = await nanoid(20);
  const tempPath = `/tmp/${tempFileName}.${extension}`;
  await fs.writeFile(tempPath, Buffer.from(coverBuffer));
  const uploadCoverResult = await cloudinaryUploadImage(tempPath);
  await fs.unlink(tempPath);
  return uploadCoverResult;
};

export const deleteImage = async (imageId: string) => {
  return cloudinaryDeleteImage(imageId);
};
