<script setup lang="ts">
defineProps<{
  placeholder?: string;
}>();

const text = defineModel<string | null>("text");
</script>

<template>
  <textarea v-model="text" :placeholder="placeholder" class="base-textarea" />
</template>

<style scoped>
.base-textarea {
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  border-width: 1px;
  border-color: var(--border-color);
  border-style: solid;
  transition: all 200ms 0s ease;
  &:hover {
    background-color: var(--hover-color);
  }
  &:focus {
    border-color: transparent;
    outline: 2px solid var(--focus-color);
    background-color: white;
  }
}
</style>
