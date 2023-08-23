import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const MAX_FILE_SIZE = 3000000;

export const rawCreateOrganizationSchema = z.object({
  name: z.string().min(3).max(30),
  originalUrl: z.string().optional().or(z.string().url()),
  description: z.string().optional().or(z.string().min(3).max(256)),
});

export const createOrganizationSchema = rawCreateOrganizationSchema.extend({
  cover: z
    .any()
    .refine((files: FileList) => {
      if (!files || !files[0]) return true;
      return files && files[0] && files[0].size <= MAX_FILE_SIZE;
    })
    .refine((files: FileList) => {
      if (!files || !files[0]) return true;
      return files && files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }),
});

export type CreateOrganizationData = Omit<
  z.infer<typeof createOrganizationSchema>,
  "cover"
> & { cover?: FileList };

export const receivedCreateOrganizationSchema =
  rawCreateOrganizationSchema.extend({
    cover: z
      .any()
      .refine((file: File) => {
        if (!file) return true;
        return file && file.size <= MAX_FILE_SIZE;
      })
      .refine((file: File) => {
        if (!file) return true;
        return file;
      }),
  });

export type SentCreateOrganizationData = Omit<
  z.infer<typeof receivedCreateOrganizationSchema>,
  "cover"
> & { cover?: File };
