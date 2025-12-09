<script setup lang="ts">
import type { ColorVariant } from "@/constants/colors";

withDefaults(
  defineProps<{
    icon: string;
    color?: ColorVariant;
    isClickable?: boolean;
  }>(),
  {
    color: "default",
    isClickable: false,
  }
);
</script>

<template>
  <font-awesome-icon
    :icon
    :color
    class="base-icon"
    :class="[`base-icon--${color}`, isClickable ? 'base-icon--clickable' : '']"
    :tabindex="isClickable ? 0 : -1"
  />
</template>

<style scoped>
.base-icon--clickable {
  cursor: pointer;
  transition: all 200ms 0s ease;
  &:hover {
    opacity: 0.5;
  }
  &:focus {
    outline: 2px solid var(--focus-color);
  }
}

/** 種類によって色を変える */
.base-icon--primary {
  color: var(--primary-color);
}
.base-icon--default {
  color: var(--text-color);
}
.base-icon--secondary {
  color: var(--text-secondary-color);
}
.base-icon--success {
  color: var(--success-color);
}
.base-icon--warning {
  color: var(--warning-color);
}
.base-icon--error {
  color: var(--error-color);
}
.base-icon--white {
  color: white;
}
</style>
