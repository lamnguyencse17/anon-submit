import { FullUserRecord } from "@/database/queries/users";
import env from "./env";
import bcrypt from "bcryptjs";
import * as jose from "jose";

const alg = "HS256";
const issuer = "lamnguyencse17";
const audience = "AnonSubmit";

export const hashPassword = async (password: string) => {
  const hashRound = env("HASH_ROUND");
  if (!hashRound) {
    return undefined;
  }
  try {
    const securedPassword = await bcrypt.hash(password, parseInt(hashRound));
    return securedPassword;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const comparePassword = async (password: string, hash: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err) {
    console.log(err);
    return false;
  }
};

type TokenPayload = Pick<FullUserRecord, "id" | "name" | "email">;

const getSecret = () => {
  const jwtSecret = env("JWT_SECRET");
  if (!jwtSecret) {
    console.log("JWT_SECRET is not set");
    return undefined;
  }
  const secret = new TextEncoder().encode(jwtSecret);
  return secret;
};

export const generateToken = async (payload: TokenPayload) => {
  const secret = getSecret();
  if (secret == null) {
    return undefined;
  }
  try {
    const token = await new jose.SignJWT({ user: payload })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setExpirationTime("24h")
      .sign(secret);
    return token;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const decodeToken = async (token: string) => {
  const secret = getSecret();
  if (secret == null) {
    return undefined;
  }
  try {
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer,
      audience,
    });
    const { user } = payload as jose.JWTPayload & { user: TokenPayload };
    return user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
