"use server";

import { SentRegisterFormData } from "./form";
import camelcaseKeys from "camelcase-keys";
import { dbCreateUser } from "@/database/queries/users";
import { hashPassword } from "@/utils/auth";

export const handleRegisterFormAction = async (
  registerFormData: SentRegisterFormData,
) => {
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
  return {
    status: 200,
    data: returnedUser,
  };
};
