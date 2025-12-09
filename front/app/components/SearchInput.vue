<script setup lang="ts">
const searchText = defineModel<string>("searchText");
</script>

<template>
  <div class="search-input__wrapper">
    <BaseIcon icon="search" color="secondary" />
    <BaseInput v-model:text="searchText" placeholder="キーワードで検索" />
  </div>
</template>

<style scoped>
.search-input__wrapper {
  position: relative;
  .base-icon {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
}
:deep(.base-input) {
  padding-left: 1.8rem;
}
</style>
