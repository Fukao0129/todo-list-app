<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    hasBorder?: boolean;
  }>(),
  {
    hasBorder: true,
  }
);
</script>

<template>
  <div
    class="flex flex-col items-start gap-2 py-2 w-full sm:gap-4 sm:flex-row sm:items-center"
    :class="{ 'border-b border-neutral-subtle': hasBorder }"
  >
    <BaseText v-if="label" tag="label" bold class="flex-[0_1_10%]">{{
      label
    }}</BaseText>
    <slot />
  </div>
</template>
