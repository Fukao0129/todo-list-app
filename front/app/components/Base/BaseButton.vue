<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string;
    type?: "primary" | "secondary" | "danger";
    leftIcon?: string;
    isDisabled?: boolean;
  }>(),
  {
    text: "Button",
    type: "primary",
    isDisabled: false,
  }
);

const buttonClass = computed(() => {
  return `base-button--${props.type}`;
});
</script>

<template>
  <button class="base-button" :class="buttonClass" :disabled="isDisabled">
    <BaseIcon
      v-if="leftIcon"
      :icon="leftIcon"
      :color="type == 'primary' ? 'white' : 'secondary'"
    />
    {{ text }}
  </button>
</template>

<style scoped>
.base-button {
  background: var(--primary-color);
  border: none;
  padding: 1px 0.4rem;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/** 種類によって背景色を変える */
.base-button--primary {
  background: var(--primary-color);
  color: white;
  &:hover {
    background: var(--focus-color);
  }
}
.base-button--secondary {
  border: 1px solid var(--border-color);
  background: var(--border-color);
  color: var(--text-color);
  &:hover {
    background: var(--hover-color);
  }
}
.base-button--danger {
  background: var(--error-color);
  color: white;
  &:hover {
    background: var(--error-hover-color);
  }
}
</style>
