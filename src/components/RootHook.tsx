"use client";

import { GetUserRecord } from "@/database/queries/users";
import useAuth from "@/hooks/useAuth";
import { FunctionComponent } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";

type RootHookProps = {
  user?: CamelCasedPropertiesDeep<GetUserRecord>;
};

const RootHook: FunctionComponent<RootHookProps> = ({ user }) => {
  useAuth(user);
  return <></>;
};

export default RootHook;
