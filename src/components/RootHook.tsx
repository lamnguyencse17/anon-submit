"use client";

import { GetUserRecord } from "@/database/queries/users";
import useAuth from "@/hooks/useAuth";
import { StoredTokenData } from "@/stores/token";
import { FunctionComponent } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";

type RootHookProps = {
  user?: CamelCasedPropertiesDeep<GetUserRecord>;
  tokenData?: StoredTokenData;
};

const RootHook: FunctionComponent<RootHookProps> = ({ user, tokenData }) => {
  useAuth(user, tokenData);
  return <></>;
};

export default RootHook;
