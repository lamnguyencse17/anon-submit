import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { DB } from "./database";
import env from "@/utils/env";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: env("DATABASE_URL"),
  }),
});

export const db = new Kysely<DB>({
  dialect,
});