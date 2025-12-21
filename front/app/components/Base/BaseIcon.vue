<script setup lang="ts">
import type { ColorTokens } from "@/types/design-token";

const props = withDefaults(
  defineProps<{
    icon: string;
    color?: ColorTokens;
    isClickable?: boolean;
  }>(),
  {
    color: "default",
    isClickable: false,
  }
);

/** デザイントークンをTailwindのユーティリティクラスにマッピング */
const colorClasses: Record<ColorTokens, string> = {
  primary: "text-primary hover:text-primary-strong",
  default: "text-neutral hover:text-neutral-strong",
  secondary: "text-neutral-muted hover:text-neutral",
  info: "text-info hover:text-info-strong",
  warning: "text-warning hover:text-warning-strong",
  error: "text-error hover:text-error-strong",
  white: "text-white",
};
const classes = computed(() => [
  colorClasses[props.color],
  props.isClickable ? "cursor-pointer transition-all" : "pointer-events-none",
]);
</script>

<template>
  <font-awesome-icon
    :icon
    :color
    class="base-icon"
    :class="classes"
    :tabindex="isClickable ? 0 : -1"
  />
</template>
