"use server";

import camelcaseKeys from "camelcase-keys";
import { dbCreateUser } from "@/database/queries/users";
import { generateToken, hashPassword } from "@/utils/auth";
import { cookies } from "next/headers";
import env from "@/utils/env";
import dayjs from "dayjs";
import { SentRegisterFormData, sentRegisterFormSchema } from "./schema";

export const handleRegisterFormAction = async (
  registerFormData: SentRegisterFormData,
) => {
  const validateResult = sentRegisterFormSchema.safeParse(registerFormData);
  if (!validateResult.success) {
    return {
      status: 400,
      message: validateResult.error,
    };
  }
  const securedPassword = await hashPassword(registerFormData.password);
  if (!securedPassword) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
  const user = await dbCreateUser({
    name: registerFormData.name,
    email: registerFormData.email,
    hashed_password: securedPassword,
  });

  if (!user) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }

  const { hashedPassword, ...returnedUser } = camelcaseKeys(user);
  const token = await generateToken(returnedUser);
  if (!token) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
  cookies().set({
    name: "Authorization",
    value: token,
    httpOnly: true,
    secure: env("NODE_ENV") === "production",
    expires: dayjs().add(1, "day").toDate(),
  });

  return {
    status: 200,
    data: returnedUser,
  };
};
