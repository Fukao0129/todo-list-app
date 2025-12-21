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
  display: flex;
    class="flex items-center gap-4 py-2 w-full"
    :class="{ 'border-b border-neutral-subtle': hasBorder }"
  >
    <BaseText v-if="label" tag="label" bold class="flex-[0_1_10%]">{{
      label
    }}</BaseText>
    <slot />
  </div>
</template>
