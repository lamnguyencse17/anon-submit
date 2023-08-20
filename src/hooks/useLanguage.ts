import useLanguageStore from "@/stores/language";
import { useEffect } from "react";

const useLanguage = (language: string) => {
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  useEffect(() => {
    setLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
};

export default useLanguage;
