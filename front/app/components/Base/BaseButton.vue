<script setup lang="ts">
import type { ColorTokens, ButtonVariantTokens } from "@/types/design-token";

const props = withDefaults(
  defineProps<{
    text: string;
    color?: ColorTokens;
    type?: ButtonVariantTokens;
    leftIcon?: string;
    isDisabled?: boolean;
  }>(),
  {
    color: "primary",
    text: "Button",
    type: "filled",
    isDisabled: false,
  }
);

/** デザイントークンをTailwindのユーティリティクラスにマッピング */
const colorClasses: Record<ColorTokens, string> = {
  primary: "bg-primary hover:bg-primary-strong text-white",
  default: "bg-neutral hover:bg-neutral-strong text-white",
  secondary: "bg-neutral-muted hover:bg-neutral text-white",
  info: "bg-info hover:bg-info-strong text-white",
  warning: "bg-warning hover:bg-warning-strong text-white",
  error: "bg-error hover:bg-error-strong text-white",
  white: "bg-white hover:bg-gray-100 text-black",
};

const classes = computed(() => colorClasses[props.color]);
</script>

<template>
  <button
    class="py-1 px-1.5 rounded-md transition-all"
    :class="classes"
    :disabled="isDisabled"
  >
    <BaseIcon v-if="leftIcon" :icon="leftIcon" color="white" />
    {{ text }}
  </button>
</template>
