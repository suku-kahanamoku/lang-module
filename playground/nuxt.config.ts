export default defineNuxtConfig({
  compatibilityDate: "2026-05-04",
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
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
