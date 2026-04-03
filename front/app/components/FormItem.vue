<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
    labelWidth?: string;
    hasBorder?: boolean;
  }>(),
  {
    labelWidth: "10%",
    hasBorder: true,
  },
);
</script>

<template>
  <div
    class="flex flex-col items-start gap-2 py-2 w-full sm:gap-4 sm:flex-row sm:items-center"
    :class="{ 'border-b border-neutral-subtle': hasBorder }"
  >
    <BaseText v-if="label" tag="label" bold class="label-width">{{
      label
    }}</BaseText>
    <slot />
  </div>
</template>

<style scoped>
.label-width {
  flex: 0 1 auto;
}

@media (min-width: 640px) {
  .label-width {
    flex: 0 1 v-bind(labelWidth);
  }
}
</style>
