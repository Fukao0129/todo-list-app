<script setup lang="ts">
import type { CardVariantTokens } from "@/types/design-token";

const props = withDefaults(
  defineProps<{
    variant?: CardVariantTokens;
    hasShadow?: boolean;
    title?: string;
  }>(),
  {
    variant: "default",
    hasShadow: true,
    title: "",
  },
);

/** デザイントークンをTailwindのユーティリティクラスにマッピング */
const variantClasses: Record<CardVariantTokens, string> = {
  default: "bg-white",
  disabled: "bg-neutral-subtle",
};

const classes = computed(() => [
  variantClasses[props.variant],
  props.hasShadow ? "shadow" : "",
]);
</script>

<template>
  <div class="border border-neutral-subtle rounded" :class="classes">
    <BaseText
      v-if="title"
      class="border-b border-neutral-subtle p-4 font-bold"
      >{{ title }}</BaseText
    >
    <slot />
  </div>
</template>
