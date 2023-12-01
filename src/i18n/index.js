import { createI18n } from "vue-i18n";
import numberFormats from "./rules/numbers.js";
import datetimeFormats from "./rules/datetime.js";
import en from "./locales/en.json";
import pt from "./locales/pt.json";


export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE || "en",
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE || "en",
  legacy: false,
  globalInjection: true,
  messages: {
    en,
    pt,
  },
  numberFormats,
  datetimeFormats,
});
