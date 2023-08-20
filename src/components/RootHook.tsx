"use client";

import { GetUserRecord } from "@/database/queries/users";
import useAuth from "@/hooks/useAuth";
import useLanguage from "@/hooks/useLanguage";
import { StoredTokenData } from "@/stores/token";
import { FunctionComponent } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";

type RootHookProps = {
  user?: CamelCasedPropertiesDeep<GetUserRecord>;
  tokenData?: StoredTokenData;
  language: string;
};

const RootHook: FunctionComponent<RootHookProps> = ({
  user,
  tokenData,
  language,
}) => {
  useAuth(user, tokenData);
  useLanguage(language);
  return <></>;
};

export default RootHook;
