import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type LanguageState = {
  data: string;
  setLanguage: (data: string) => void;
  resetLanguage: () => void;
};

const useLanguageStore = createWithEqualityFn<LanguageState>()(
  devtools(
    immer((set) => ({
      data: "en",
      setLanguage: (data) =>
        set(
          (state) => {
            state.data = data;
          },
          false,
          "setLanguage",
        ),
      resetLanguage: () =>
        set(
          (state) => {
            state.data = "en";
          },
          false,
          "resetLanguage",
        ),
    })),
  ),
  shallow,
);

export default useLanguageStore;
