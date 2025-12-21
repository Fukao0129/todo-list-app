<script setup lang="ts">
defineProps<{
  placeholder?: string;
}>();

const text = defineModel<string | null>("text");
</script>

<template>
  <textarea
    v-model="text"
    :placeholder="placeholder"
    class="p-2 w-full rounded-md border border-neutral-subtle hover:bg-primary-subtle focus:ring-primary focus:border-transparent focus:outline-none focus:bg-white focus:ring-2 transition-all"
  />
</template>
