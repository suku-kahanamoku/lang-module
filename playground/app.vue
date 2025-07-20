<script setup lang="ts">
const {
  i18n: { locale },
} = useLang();
const localePath = useLocalePath();
</script>
<template>
  <div>Nuxt module playground!</div>
  <div>{{ $tt("$.btn.submit") }}</div>
  <div>
    {{ locale }}
  </div>
  <div>
    {{ localePath("/") }}
  </div>
</template>

<script setup></script>
