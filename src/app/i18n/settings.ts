export const fallbackLng = "en";
export const languages = [fallbackLng, "vi"];
export const defaultNS = "translation";

export const getOptions = (lng = fallbackLng, ns = defaultNS) => {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
};
