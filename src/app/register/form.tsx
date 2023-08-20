"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleRegisterFormAction } from "./action";
import { SUCCESSFUL_STATUS } from "@/constants/status";
import useUserStore from "@/stores/user";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { RegisterFormSchemaType, registerFormSchema } from "./schema";
import useClientTranslation from "@/hooks/useClientTranslation";

export const RegisterForm = () => {
  const { t } = useClientTranslation();
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema as any),
  });
  const { pending } = useFormStatus();

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
        placeholder={t("register.placeholder.name")}
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
        placeholder={t("register.placeholder.email")}
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
        placeholder={t("register.placeholder.password")}
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
        placeholder={t("register.placeholder.password_confirm")}
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
        disabled={pending}
      >
        {t("register.cta")}
      </button>
    </form>
  );
};
