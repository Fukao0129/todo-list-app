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
    class="form-item__wrapper"
    :class="{ 'form-item__wrapper--has-border': hasBorder }"
  >
    <BaseText v-if="label" tag="label" bold class="form-item__label">{{
      label
    }}</BaseText>
    <slot />
  </div>
</template>

<style scoped>
.form-item__wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  width: 100%;
  .form-item__label {
    flex: 0 1 10%;
  }
}
.form-item__wrapper--has-border {
  border-bottom: 1px solid var(--border-color);
}
</style>
