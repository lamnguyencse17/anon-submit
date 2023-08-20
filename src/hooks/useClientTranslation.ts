import { useInnerClientTranslation } from "@/app/i18n/client";
import { languageNamespace } from "@/constants/settings";
import useLanguageStore from "@/stores/language";

const useClientTranslation = () => {
  const language = useLanguageStore((state) => state.data);
  return useInnerClientTranslation(language, languageNamespace, {});
};

export default useClientTranslation;
