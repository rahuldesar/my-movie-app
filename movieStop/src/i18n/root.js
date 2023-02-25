import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import en from "./locales/en";
import es from "./locales/es";

const resources = {
  en,
  es,
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    debug: false,

    detection: {
      order: ["queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      wait: true,
      useSuspense: false,
    },
  });

export default i18n;
