import type { Composer } from "vue-i18n";
import { defineNuxtPlugin, useHead } from "#app";

/**
 * @file plugin.ts
 * @description
 * Tento plugin rozšiřuje funkcionalitu i18n v Nuxt aplikaci. Nastavuje atribut `lang` v HTML
 * na základě aktuálního jazyka a poskytuje pomocnou funkci `tt` pro překlady.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as Composer;
  const { t, locale } = i18n;

  const updateLangAttribute = (lang: string) => {
    useHead({ htmlAttrs: { lang } });
  };

  updateLangAttribute(locale.value);

  nuxtApp.hook("i18n:localeSwitched", ({ newLocale }) => {
    updateLangAttribute(newLocale);
  });

  return {
    provide: {
      tt: (value: string | unknown, params?: Parameters<typeof t>[1]) =>
        typeof value === "string" && value.startsWith("$.")
          ? t(value, params ?? {})
          : value,
    },
  };
});
