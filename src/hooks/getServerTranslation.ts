import { getInnerServerTranslation } from "@/i18n";
import { languageNamespace } from "@/constants/settings";
import serverDetectLanguage from "@/utils/serverHook/serverDetectLanguage";

const getServerTranslation = () => {
  const language = serverDetectLanguage();
  return getInnerServerTranslation(language, languageNamespace, {});
};

export default getServerTranslation;
