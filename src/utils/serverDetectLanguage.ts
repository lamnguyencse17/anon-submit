import { headers } from "next/headers";
import languageParser from "accept-language-parser";
import { fallbackLng } from "@/app/i18n/settings";

const serverDetectLanguage = () => {
  const languageHeader = headers().get("accept-language");
  const parsedLanguage = languageParser.parse(languageHeader || undefined);
  const lng = parsedLanguage[0]?.code || fallbackLng;
  return lng;
};

export default serverDetectLanguage;
