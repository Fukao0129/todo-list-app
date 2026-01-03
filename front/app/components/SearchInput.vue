<script setup lang="ts">
const searchText = defineModel<string>();
</script>

<template>
  <div class="search-input__wrapper relative">
    <BaseIcon
      icon="search"
      color="secondary"
      class="absolute left-2 top-1/2 transform -translate-y-1/2"
    />
    <BaseInput v-model="searchText" placeholder="キーワードで検索" />
  </div>
</template>

<style scoped>
:deep(.base-input) {
  padding-left: 1.8rem;
}
</style>
