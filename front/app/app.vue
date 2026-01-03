<script setup lang="ts">
/** タイトル */
useHead({
  titleTemplate: (titleChunk?: string) =>
    titleChunk ? `${titleChunk} | ${APP_NAME}` : APP_NAME,
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <Snackbar />
  </div>
</template>
