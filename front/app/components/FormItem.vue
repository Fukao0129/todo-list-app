<script setup lang="ts">
export type FormItemProps = {
  label?: string;
  hasBorder?: boolean;
};

withDefaults(defineProps<FormItemProps>(), {
  label: "",
  hasBorder: true,
});
</script>

<template>
  <div
    class="form-item__wrapper"
    :class="{ 'form-item__wrapper--has-border': hasBorder }"
  >
    <label>{{ label }}</label>
    <slot />
  </div>
</template>

<style scoped>
.form-item__wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  label {
    flex: 0 1 10%;
    font-size: 0.9rem;
    font-weight: bold;
    white-space: nowrap;
  }
}
.form-item__wrapper--has-border {
  border-bottom: 1px solid var(--border-color);
}
</style>
