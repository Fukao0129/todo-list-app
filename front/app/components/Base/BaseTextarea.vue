<script setup lang="ts">
export type BaseTextareaProps = {
  placeholder?: string;
};
defineProps<BaseTextareaProps>();

const text = defineModel<string | null>("text");
</script>

<template>
  <textarea v-model="text" :placeholder="placeholder" />
</template>

<style scoped>
textarea {
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
