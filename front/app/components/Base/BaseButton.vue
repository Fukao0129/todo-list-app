<script setup lang="ts">
import type { ColorTokens, ButtonVariantTokens } from "@/types/design-token";

const props = withDefaults(
  defineProps<{
    text: string;
    color?: ColorTokens;
    variant?: ButtonVariantTokens;
    leftIcon?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: (e: MouseEvent) => Promise<void | unknown> | void;
  }>(),
  {
    color: "primary",
    text: "Button",
    variant: "filled",
    isLoading: false,
    onClick: undefined,
  },
);

/** ハイドレーション待機 */
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

/** 内部的なローディング状態 */
const islLoading = ref(false);

const handleClick = async (event: MouseEvent) => {
  if (props.onClick) {
    try {
      islLoading.value = true;
      await props.onClick(event);
    } finally {
      islLoading.value = false;
    }
  }
};

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
    class="py-1 px-1.5 rounded-md transition-all relative"
    :class="classes"
    :disabled="isDisabled || islLoading || !isMounted"
    @click="handleClick"
  >
    <BaseIcon v-if="leftIcon" :icon="leftIcon" color="white" />
    <LoadingSpinner
      v-if="islLoading || !isMounted"
      color="white"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <span :class="{ 'opacity-0': islLoading || !isMounted }">
      {{ text }}
    </span>
  </button>
</template>
