import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CamelCasedPropertiesDeep, Except } from "type-fest";
import { immer } from "zustand/middleware/immer";
import { FullUserRecord } from "@/database/queries/users";

type StoredUserData = Except<
  CamelCasedPropertiesDeep<FullUserRecord>,
  "hashedPassword"
>;

type UserState = {
  data?: StoredUserData;
  setUser: (user: StoredUserData) => void;
  resetUser: () => void;
};

const useUserStore = create<UserState>()(
  devtools(
    immer((set) => ({
      data: undefined,
      setUser: (user) =>
        set(
          (state) => {
            state.data = user;
          },
          false,
          "setUser",
        ),
      resetUser: () =>
        set(
          (state) => {
            state.data = undefined;
          },
          false,
          "resetUser",
        ),
    })),
  ),
);

export default useUserStore;
