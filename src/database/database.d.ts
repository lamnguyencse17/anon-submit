import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type UserType = "ADMIN" | "USER";

export interface Attachments {
  id: Generated<number>;
  url: string;
  submission_id: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface Organizations {
  id: Generated<number>;
  name: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  cover: string | null;
  description: string | null;
  original_url: string | null;
  deleted_at: Timestamp | null;
  owned_by: number | null;
  slug: string;
}

export interface Submissions {
  id: Generated<string>;
  content: string;
  organization_id: number;
  is_approved: Generated<boolean | null>;
  actioned_by: number | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  approved_at: Timestamp | null;
  deleted_at: Timestamp | null;
}

export interface UserOrganization {
  id: Generated<number>;
  user_id: number;
  organization_id: number;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Users {
  id: Generated<number>;
  name: string;
  email: string;
  hashed_password: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  type: Generated<UserType>;
}

export interface DB {
  attachments: Attachments;
  organizations: Organizations;
  submissions: Submissions;
  user_organization: UserOrganization;
  users: Users;
}
