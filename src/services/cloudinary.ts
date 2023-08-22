import env from "@/utils/env";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { ReadStream } from "fs";

cloudinary.config({
  cloud_name: env("CLOUDINARY_CLOUD_NAME"),
  api_key: env("CLOUDINARY_API_KEY"),
  api_secret: env("CLOUDINARY_API_SECRET"),
});

export const uploadImage = async (filePath: string) => {
  try {
    const uploadResult: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader.upload(filePath, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      },
    );
    return uploadResult;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
