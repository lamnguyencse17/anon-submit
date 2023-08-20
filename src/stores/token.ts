import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { TokenData } from "@/utils/auth";
import { Spread } from "type-fest";

export type StoredTokenData = Spread<Partial<TokenData>, { token?: string }>;

type TokenState = {
  data?: StoredTokenData;
  setToken: (data: StoredTokenData) => void;
  resetToken: () => void;
};

const useTokenStore = createWithEqualityFn<TokenState>()(
  devtools(
    immer((set) => ({
      data: undefined,
      setToken: (data) =>
        set(
          (state) => {
            state.data = data;
          },
          false,
          "setToken",
        ),
      resetToken: () =>
        set(
          (state) => {
            state.data = undefined;
          },
          false,
          "resetToken",
        ),
    })),
  ),
  shallow,
);

export default useTokenStore;
