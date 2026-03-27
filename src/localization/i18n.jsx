import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import * as localizationEn from "@MELocalization/en";

const resources = {
  en: {
    translation: {
      ...localizationEn,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
