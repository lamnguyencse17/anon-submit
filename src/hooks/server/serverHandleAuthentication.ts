import camelcaseKeys from "camelcase-keys";
import { cookies } from "next/headers";
import { GetUserRecord, getUserById } from "@/database/queries/users";
import dayjs, { Dayjs } from "dayjs";
import { CamelCasedPropertiesDeep } from "type-fest";
import { TokenData, decodeToken } from "@/utils/auth";

const authCache: Record<number, { date: Dayjs; user: GetUserRecord }> = {};

const CACHE_LIMIT = 1000 * 60;

const getAuthCache = (userId: number): GetUserRecord | undefined => {
  const { date, user } = authCache[userId] || {};
  if (Math.abs(dayjs(date).diff()) > CACHE_LIMIT) {
    delete authCache[userId];
    return undefined;
  }
  return user;
};

const writeAuthCache = (userId: number, user: GetUserRecord) => {
  authCache[userId] = { date: dayjs(), user };
};

export const getUser = async (
  userId: number,
): Promise<GetUserRecord | undefined> => {
  let user = getAuthCache(userId);
  if (user) {
    return user;
  }
  user = await getUserById(userId);
  if (!user) {
    return undefined;
  }
  writeAuthCache(userId, user);
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
