<script setup lang="ts">
import type { Snackbar } from "@/types/snackbar";

/** タイトル */
useHead({
  titleTemplate: (titleChunk?: string) =>
    titleChunk ? `${titleChunk} | ${APP_NAME}` : APP_NAME,
});

/** スナックバー用の状態管理 */
useState<Snackbar>("snackbar", () => ({
  isShow: false,
  message: "",
  type: "success",
}));
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <Snackbar />
  </div>
</template>
