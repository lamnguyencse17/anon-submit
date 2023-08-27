import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/settings";
import { z } from "zod";

export const rawCreateSubmissionSchema = z.object({
  content: z.string().min(20),
});

export const createSubmissionsSchema = rawCreateSubmissionSchema.extend({
  attachments: z
    .any()
    .refine((files: FileList) => {
      if (!files) return true;
      const fileList = Array.from(files);
      return fileList.every((file) => file && file.size <= MAX_FILE_SIZE);
    })
    .refine((files: FileList) => {
      if (!files) return true;
      const fileList = Array.from(files);
      return fileList.every(
        (file) => file && ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      );
    })
    .refine((files: FileList) => {
      if (!files) return true;
      const fileList = Array.from(files);
      return fileList.length <= 3;
    })
    .refine((files: FileList) => {
      if (!files) return true;
      const totalSize = Array.from(files).reduce((acc, file) => {
        return acc + file.size;
      }, 0);
      return totalSize <= MAX_FILE_SIZE;
    }),
});

export type CreateSubmissionData = Omit<
  z.infer<typeof createSubmissionsSchema>,
  "attachments"
> & { attachments?: FileList };

export const sentSubmissionSchema = rawCreateSubmissionSchema.extend({
  attachments: z
    .any()
    .refine((files?: File[]) => {
      if (!files) return true;
      return files.every((file) => file && file.size <= MAX_FILE_SIZE);
    })
    .refine((files?: File[]) => {
      if (!files) return true;
      return files.every(
        (file) => file && ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      );
    })
    .refine((files?: File[]) => {
      if (!files) return true;
      return files.length <= 3;
    })
    .refine((files?: File[]) => {
      if (!files) return true;
      const totalSize = files.reduce((acc, file) => {
        return acc + file.size;
      }, 0);
      return totalSize <= MAX_FILE_SIZE;
    }),
  organizationId: z.preprocess((x) => Number(x), z.number()),
});

export type SentSubmissionData = Omit<
  z.infer<typeof sentSubmissionSchema>,
  "attachments"
> & { attachments?: File[] };
