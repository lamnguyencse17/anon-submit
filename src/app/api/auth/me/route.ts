import { getUserById } from "@/database/queries/users";
import { decodeToken } from "@/utils/auth";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: NextApiResponse) => {
  const token = cookies().get("Authorization")?.value;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decodedUser = await decodeToken(token);
  if (!decodedUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await getUserById(decodedUser.id);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200).json({ data: user });
};
