import { defineStore } from "pinia";
import i18n from "@/i18n";

export const useStoreLang = defineStore("lang", {
  state: () => {
    return {
      lang: null,
    };
  },
  actions: {
    init() {
      this.lang = this.getPersistedLocale();
      this.switchLanguage(this.lang || this.defaultLocale());
    },
    async switchLanguage(newLocale) {
      await this.currentLocale(newLocale);
      document.querySelector("html").setAttribute("lang", newLocale);
      localStorage.setItem("user-locale", newLocale);
    },
    getPersistedLocale() {
      const persistedLocale = localStorage.getItem("user-locale");
      if (this.isLocaleSupported(persistedLocale)) {
        return persistedLocale;
      } else {
        return null;
      }
    },
    isLocaleSupported(locale) {
      return this.supportedLocales.includes(locale);
    },
    defaultLocale() {
      return import.meta.env.VITE_DEFAULT_LOCALE;
    },
    currentLocale(newLocale) {
      i18n.global.locale.value = newLocale;
    },
  },
  getters: {
    supportedLocales() {
      return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
    },
  },
});
