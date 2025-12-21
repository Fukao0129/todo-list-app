<script setup lang="ts">
import type { ColorTokens, TextSizeTokens } from "@/types/design-token";

const props = withDefaults(
  defineProps<{
    tag?: "p" | "span" | "label";
    size?: TextSizeTokens;
    color?: ColorTokens;
    align?: "left" | "center" | "right" | "justify";
    bold?: boolean;
  }>(),
  {
    tag: "p",
    size: "default",
    color: "default",
    align: "left",
    bold: false,
  }
);

/** デザイントークンをTailwindのユーティリティクラスにマッピング */
const sizeClasses: Record<TextSizeTokens, string> = {
  xs: "text-xs", // 0.75rem (12px)
  small: "text-sm", // 0.875rem (14px)
  default: "text-base", // 1rem (16px)
  large: "text-lg", // 1.125rem (18px)
};
const colorClasses: Record<ColorTokens, string> = {
  primary: "text-primary",
  default: "text-neutral",
  secondary: "text-neutral-muted",
  info: "text-info",
  warning: "text-warning",
  error: "text-error",
  white: "text-white",
};
const alignClasses: Record<typeof props.align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const classes = computed(() => [
  sizeClasses[props.size],
  alignClasses[props.align],
  colorClasses[props.color],
  props.bold ? "font-bold" : "",
]);
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
