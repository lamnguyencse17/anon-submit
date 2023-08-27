import camelcaseKeys from "camelcase-keys";
import { cookies } from "next/headers";
import { GetUserRecord, getUserById } from "@/database/queries/users";
import { CamelCasedPropertiesDeep } from "type-fest";
import { TokenData, decodeToken } from "@/utils/auth";
import { getUserWithCache } from "./cached";

export const getUser = async (
  userId: number,
): Promise<GetUserRecord | undefined> => {
  const user = getUserWithCache(userId);
  return user;
};

const serverHandleAuthentication = async (): Promise<
  Partial<{
    user: CamelCasedPropertiesDeep<GetUserRecord>;
    token: string;
    tokenData: TokenData;
  }>
> => {
  const token = cookies().get("Authorization")?.value;
  if (!token) {
    return {};
  }
  const tokenData = await decodeToken(token);
  if (!tokenData) {
    return {};
  }
  const sharedReturnValue = { tokenData, token };
  const user = await getUser(tokenData.user.id);
  if (!user) {
    return sharedReturnValue;
  }
  return { user: camelcaseKeys(user), ...sharedReturnValue };
};

export default serverHandleAuthentication;
