<script setup lang="ts">
import type { SelectOption } from "@/types/select-option";

defineProps<{
  options: SelectOption[];
}>();

const selectedValue = defineModel<number>("selectedValue");
</script>

<template>
  <select
    v-model="selectedValue"
    class="cursor-pointer border px-2 py-1 transition-all border-neutral-subtle rounded-md hover:bg-primary-subtle focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary focus:bg-white"
  >
    <option v-for="item in options" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>
