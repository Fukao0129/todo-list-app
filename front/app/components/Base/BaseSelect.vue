<script setup lang="ts">
import type { SelectOption } from "@/types/select-option";

defineProps<{
  options: SelectOption[];
}>();

const selectedValue = defineModel<number>("selectedValue");
</script>

<template>
  <select v-model="selectedValue" class="base-select">
    <option v-for="item in options" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>

<style scoped>
.base-select {
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  border-color: var(--border-color);
  border-style: solid;
  cursor: pointer;
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
