import {
  addPlugin,
  addImportsDir,
  defineNuxtModule,
  createResolver,
  installModule,
  hasNuxtModule,
  addServerImportsDir,
} from "@nuxt/kit";
import type { NuxtI18nOptions } from "@nuxtjs/i18n";
import defu from "defu";

/**
 * @typedef {Object} ModuleOptions
 * @extends NuxtI18nOptions
 * @description
 * Rozšiřuje možnosti konfigurace modulu `@nuxtjs/i18n`.
 */
export interface ModuleOptions extends NuxtI18nOptions {}

/**
 * @module lang-module
 * @description
 * Tento modul poskytuje podporu pro lokalizaci a mezinárodní prostředí (i18n) v Nuxt aplikaci.
 * Je založen na modulu `@nuxtjs/i18n` a přidává vlastní konfigurace a rozšíření.
 *
 * @default
 * Výchozí konfigurace:
 * - `lazy`: true
 * - `strategy`: "prefix_except_default"
 * - `defaultLocale`: "en"
 * - `detectBrowserLanguage`: { useCookie: false, cookieKey: "i18n_locale" }
 * - `experimental`: {}
 *
 * @example
 * ```typescript
 * export default defineNuxtConfig({
 *   langModule: {
 *     defaultLocale: "cs",
 *     strategy: "prefix",
 *   },
 * });
 * ```
 */
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "lang-module",
    configKey: "langModule",
  },
  // Výchozí možnosti konfigurace Nuxt modulu
  defaults: {
    defaultLocale: "en",
    strategy: "prefix_except_default", // Strategie pro generování URL s lokalizací
    detectBrowserLanguage: false,
    experimental: {}, // Experimentální funkce (prázdné ve výchozím nastavení)
  },

  /**
   * @function setup
   * @description
   * Hlavní funkce modulu, která nastavuje konfiguraci a přidává potřebné součásti.
   *
   * @param {ModuleOptions} _options - Uživatelské možnosti konfigurace.
   * @param {Nuxt} _nuxt - Instance Nuxt aplikace.
   */
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);
    _nuxt.options.i18n = defu(_nuxt.options.i18n, _options as any);

    _nuxt.hook("i18n:registerModule", (register) => {
      register({
        langDir: resolve("./runtime/assets/locales"),
        locales: [
          {
            code: "en",
            file: "en.json",
          },
          {
            code: "cs",
            file: "cs.json",
          },
        ],
      });
    });

    // Přidání composables
    addImportsDir(resolve("./runtime/composables"));

    // Přidání pluginu
    addPlugin(resolve("./runtime/plugin"));

    // Přidání server composables
    addServerImportsDir(resolve("./runtime/server/composables"));

    // Install common module
    if (!hasNuxtModule("@suku-kahanamoku/common-module")) {
      await installModule("@suku-kahanamoku/common-module");
    }

    // Instalace i18n modulu, pokud není již nainstalován
    if (!hasNuxtModule("@nuxtjs/i18n")) {
      await installModule("@nuxtjs/i18n");
    }
  },
});
