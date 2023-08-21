import { createInstance, init } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function getInnerServerTranslation(
  lng: string,
  ns: string,
  options: any,
) {
  const i18nextInstance = await initI18next(lng, ns);
  const zodI18n = await initI18next(lng, "zod");
  const translationService = {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix,
    ),
    i18n: i18nextInstance,
  };
  z.setErrorMap(
    makeZodI18nMap({
      t: zodI18n.getFixedT(
        lng,
        Array.isArray(ns) ? ns[0] : ns,
        options.keyPrefix,
      ),
    }),
  );
  return translationService;
}
