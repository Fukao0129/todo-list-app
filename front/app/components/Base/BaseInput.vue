<script setup lang="ts">
defineProps<{
  placeholder?: string;
  errorMessage?: string[];
  label?: string;
}>();

const text = defineModel<string>("text");
</script>

<template>
  <div class="base-input__wrapper">
    <BaseText v-if="label" size="small" color="secondary">{{ label }}</BaseText>
    <input
      v-model="text"
      type="text"
      :placeholder
      class="base-input"
      :class="{ 'base-input--error': errorMessage }"
    />
    <BaseText v-if="errorMessage" size="small" color="error" bold>{{
      errorMessage.join("/ ")
    }}</BaseText>
  </div>
</template>

<style scoped>
.base-input__wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 100%;
}
.base-input {
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

/** エラー時 */
.base-input--error {
  border-color: var(--error-color);
}
</style>
