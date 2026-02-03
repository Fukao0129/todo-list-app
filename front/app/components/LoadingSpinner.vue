<script setup lang="ts">
import type { ColorTokens } from "@/types/design-token";

withDefaults(
  defineProps<{
    color?: ColorTokens;
  }>(),
  {
    color: "primary",
  },
);

/** デザイントークンをTailwindのユーティリティクラスにマッピング */
const colorClasses: Record<ColorTokens, string> = {
  primary: "stroke-primary",
  default: "stroke-neutral",
  secondary: "stroke-neutral-muted",
  info: "stroke-info",
  warning: "stroke-warning",
  error: "stroke-error",
  white: "stroke-white",
};
</script>

<template>
  <svg
    width="15"
    height="15"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    :class="colorClasses[color]"
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="5">
        <circle stroke-opacity=".5" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
</template>
