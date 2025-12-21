<script setup lang="ts">
import type { CardVariantTokens } from "@/types/design-token";

const props = withDefaults(
  defineProps<{
    variant?: CardVariantTokens;
    hasShadow?: boolean;
  }>(),
  {
    variant: "white",
    hasShadow: true,
  }
);

/** デザイントークンをTailwindのユーティリティクラスにマッピング */
const variantClasses: Record<CardVariantTokens, string> = {
  white: "bg-white",
  disabled: "bg-neutral-subtle",
};

const classes = computed(() => [
  variantClasses[props.variant],
  props.hasShadow ? "shadow" : "",
]);
</script>

<template>
  <div class="border border-neutral-subtle rounded" :class="classes">
    <slot />
  </div>
</template>
