<script setup lang="ts">
const searchText = defineModel<string>("searchText");
</script>

<template>
  <div class="search-input__wrapper">
    <BaseIcon icon="search" class="search-icon" />
    <input
      v-model="searchText"
      type="text"
      placeholder="キーワードで検索"
      class="search-input"
    />
  </div>
</template>

<style scoped>
.search-input__wrapper {
  position: relative;
  .search-icon {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
  .search-input {
    padding-left: 1.8rem;
  }
}
</style>
