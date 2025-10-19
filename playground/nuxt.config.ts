export default defineNuxtConfig({
  modules: ["../src/module"],
  langModule: {},
  devtools: { enabled: true },
  i18n: {
    defaultLocale: "cs",
    langDir: "locales/",
    locales: [
      {
        code: "cs",
        language: "cs-CZ",
        icon: "emojione:flag-for-czechia",
        file: "./cs.json",
      },
    ],
  },
});
