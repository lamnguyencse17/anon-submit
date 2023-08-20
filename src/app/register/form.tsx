"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { handleRegisterFormAction } from "./action";
import { useTransition } from "react";
import { SUCCESSFUL_STATUS } from "@/constants/status";
import useUserStore from "@/stores/user";

export const registerFormSchema = z
  .object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type SentRegisterFormData = Omit<
  RegisterFormSchemaType,
  "confirmPassword"
>;

export const RegisterForm = () => {
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema as any),
  });

  const setUser = useUserStore((state) => state.setUser);
  return (
    <form
      action={async () => {
        const isValid = await trigger();
        if (!isValid) return;
        const sentRegisterFormData = getValues();
        const response = await handleRegisterFormAction(sentRegisterFormData);
        if (response.status === SUCCESSFUL_STATUS) {
          const userData = response.data;
          if (userData) {
            setUser(userData);
          }
        }
      }}
      className="flex w-2/3 flex-col"
    >
      <input
        {...register("name")}
        placeholder="Name"
        type="text"
        className="w-full rounded border border-secondary p-2 focus:outline-dark"
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.name?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.name?.message || "holder"}
      </p>
      <input
        {...register("email")}
        placeholder="Email"
        type="email"
        className="mt-4 w-full rounded border border-secondary p-2 focus:outline-dark"
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.email?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.email?.message || "holder"}
      </p>

      <input
        {...register("password")}
        placeholder="Password"
        type="password"
        className="mt-4 w-full rounded border border-secondary p-2 focus:outline-dark"
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.password?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.password?.message || "holder"}
      </p>

      <input
        {...register("confirmPassword")}
        placeholder="Confirm Password"
        type="password"
        className="mt-4 w-full rounded border border-secondary p-2 focus:outline-dark"
      />
      <p
        className={`text-left text-sm text-red-700 ${
          errors?.confirmPassword?.message ? "visible" : "invisible"
        }`}
      >
        {errors?.confirmPassword?.message || "holder"}
      </p>

      <button
        type="submit"
        className="border-1 mx-auto mt-4 w-1/4 rounded border border-dark bg-secondary p-2 hover:border hover:border-dark hover:bg-primary hover:text-dark"
      >
        Submit
      </button>
    </form>
  );
};
