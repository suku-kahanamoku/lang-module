import type { Composer } from "vue-i18n";

// Augment NuxtApp and Vue instance with $tt

declare module "#app" {
  interface NuxtApp {
    $tt: Composer["t"];
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $tt: Composer["t"];
  }
}
