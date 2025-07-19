import type { H3Event } from "h3";
import {
  tryQueryLocale,
  tryCookieLocale,
  tryHeaderLocale,
} from "@intlify/utils/h3";
import { useTranslation, DefineLocaleMessage, CoreContext } from "@intlify/h3";

import { useRuntimeConfig } from "#imports";

/**
 * @function useLocaleDetector
 * @description
 * Detekuje jazyk na základě dotazu, cookies nebo hlavičky požadavku.
 * Pokud není jazyk detekován, vrátí výchozí jazyk z konfigurace.
 *
 * @param {H3Event} event - Událost H3.
 * @param {CoreContext<string, DefineLocaleMessage>} config - Kontext lokalizace.
 * @returns {string} Detekovaný jazyk nebo výchozí jazyk.
 */
export const useLocaleDetector = (
  event: H3Event,
  config: CoreContext<string, DefineLocaleMessage>
): string => {
  const runtimeConfig = useRuntimeConfig(event).public;

  return (
    tryQueryLocale(event, { lang: "" })?.toString() ||
    tryCookieLocale(event, {
      lang: "",
      name: runtimeConfig?.i18n?.detectBrowserLanguage?.cookieKey,
    })?.toString() ||
    tryHeaderLocale(event, { lang: "" })?.toString() ||
    runtimeConfig?.i18n?.defaultLocale
  );
};

/**
 * @function useTranslate
 * @description
 * Překládá zadanou hodnotu pomocí funkce `useTranslation`.
 * Pokud dojde k chybě, vrátí původní hodnotu.
 *
 * @param {H3Event} event - Událost H3.
 * @param {string} value - Hodnota k překladu.
 * @returns {Promise<string>} Přeložená hodnota nebo původní hodnota.
 */
export const useTranslate = async (
  event: H3Event,
  value: string
): Promise<string> => {
  try {
    const t = await useTranslation(event);
    return t(value);
  } catch {
    return value;
  }
};
