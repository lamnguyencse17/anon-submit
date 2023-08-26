import * as z from "zod";

export const sentRegisterFormSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export const registerFormSchema = sentRegisterFormSchema
  .extend({
    confirmPassword: z.string().min(8).max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type SentRegisterFormData = z.infer<typeof sentRegisterFormSchema>;
