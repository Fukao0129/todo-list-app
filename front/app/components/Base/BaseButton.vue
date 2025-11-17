<script setup lang="ts">
export type BaseModalProps = {
  text: string;
  type?: "main" | "secondary" | "danger";
  leftIcon?: string;
};
const props = withDefaults(defineProps<BaseModalProps>(), {
  text: "Button",
  type: "main",
});

const buttonClass = computed(() => {
  return `base-button--${props.type}`;
});
</script>

<template>
  <button :class="buttonClass">
    <BaseIcon
      v-if="leftIcon"
      :icon="leftIcon"
      :color="type == 'main' ? 'white' : 'lightgray'"
    />
    {{ text }}
  </button>
</template>

<style scoped>
button {
  background: var(--primary-color);
  border: none;
  padding: 1px 0.4rem;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s ease;
}

/** 種類によって背景色を変える */
.base-button--main {
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
