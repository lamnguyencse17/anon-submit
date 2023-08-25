import { MAX_FILE_SIZE } from "@/constants/settings";
import Compressor from "compressorjs";

export const compressImage = async (imageFile: File) => {
  const compressedImage = await new Promise<File | Blob>((resolve, reject) => {
    new Compressor(imageFile, {
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1920,
      convertSize: MAX_FILE_SIZE,
      success: (result) => {
        resolve(result);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
  return compressedImage;
};
