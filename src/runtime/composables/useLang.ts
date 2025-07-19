import { computed, type ComputedRef } from "vue";
import { type Composer, type ComposerTranslation } from "vue-i18n";
import { useNuxtApp, useSwitchLocalePath } from "#imports";
import type { LocaleObject } from "@nuxtjs/i18n";

/**
 * @interface ILocaleObject
 * @extends LocaleObject
 * @description
 * Rozšiřuje základní objekt lokalizace o další vlastnosti.
 *
 * @property {string} label - Přeložený název jazyka.
 * @property {string} to - Cesta pro přepnutí na daný jazyk.
 */
interface ILocaleObject extends LocaleObject {
  label: string;
  to: string;
  icon?: string;
}

/**
 * @interface ILang
 * @description
 * Obsahuje informace o lokalizaci a překladové funkce.
 *
 * @property {Composer} i18n - Instance i18n pro práci s lokalizací.
 * @property {ComposerTranslation} t - Překladová funkce.
 * @property {ComputedRef<ILocaleObject[]>} langs - Seznam všech podporovaných jazyků.
 * @property {ComputedRef<ILocaleObject[]>} filtredLangs - Seznam jazyků kromě aktuálního.
 * @property {ComputedRef<ILocaleObject>} lang - Aktuální jazyková mutace.
 */
interface ILang {
  i18n: Composer;
  t: Composer["t"];
  langs: ComputedRef<ILocaleObject[]>;
  filtredLangs: ComputedRef<ILocaleObject[]>;
  lang: ComputedRef<ILocaleObject>;
}

/**
 * @function useLang
 * @description
 * Poskytuje informace o aktuálním jazyce, dostupných jazycích a překládací funkci.
 *
 * @returns {ILang} Objekt obsahující informace o lokalizaci a překladovou funkci.
 */
export const useLang = (): ILang => {
  const nuxtApp = useNuxtApp();
  const { $i18n: i18n, $tt: t } = nuxtApp;
  const switchLocale = useSwitchLocalePath();

  const langs = computed(() =>
    i18n.locales.value.map((locale) => ({
      ...locale,
      label: t(`$.${locale.code}`),
      to: switchLocale(locale.code),
    }))
  );

  const lang = computed(
    () =>
      langs.value.find((l) => l.code === i18n.locale.value) ||
      ({} as ILocaleObject)
  );

  const filtredLangs = computed(() =>
    langs.value.filter((l) => l.code !== i18n.locale.value)
  );

  return { i18n, t, langs, lang, filtredLangs };
};
