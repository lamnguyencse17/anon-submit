"use server";

import camelcaseKeys from "camelcase-keys";
import { getUserByEmail } from "@/database/queries/users";
import { comparePassword, generateToken } from "@/utils/auth";
import { cookies } from "next/headers";
import env from "@/utils/env";
import dayjs from "dayjs";
import { LoginFormSchemaType, loginFormSchema } from "./schema";

export const handleLoginFormAction = async (
  loginFormData: LoginFormSchemaType,
) => {
  const validateResult = loginFormSchema.safeParse(loginFormData);
  if (!validateResult.success) {
    return {
      status: 400,
      message: validateResult.error,
    };
  }
  const foundUser = await getUserByEmail(loginFormData.email);
  if (!foundUser) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  const { hashedPassword, ...returnedUser } = camelcaseKeys(foundUser);
  const isPasswordMatch = await comparePassword(
    loginFormData.password,
    hashedPassword,
  );
  if (!isPasswordMatch) {
    return {
      status: 401,
      message: "Wrong password",
    };
  }
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
