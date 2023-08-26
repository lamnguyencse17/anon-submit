import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
