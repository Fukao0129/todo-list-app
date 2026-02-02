<script setup lang="ts">
import type { Snackbar } from "@/types/snackbar";

const { snackbar } = useSnackbar();

/** デザイントークンをTailwindのユーティリティクラスとアイコン種別にマッピング */
const typeClasses: Record<
  Snackbar["type"],
  { backgroundColor: string; icon: string }
> = {
  success: {
    backgroundColor: "bg-neutral",
    icon: "circle-check",
  },
  error: {
    backgroundColor: "bg-error",
    icon: "triangle-exclamation",
  },
};

const classes = computed(() => typeClasses[snackbar.value.type]);
</script>

<template>
  <Transition
    enter-active-class="animate-slide-in-up"
    leave-active-class="animate-slide-out-down"
  >
    <div
      v-if="snackbar.isVisible"
      class="fixed left-4 bottom-4 text-white p-4 shadow-lg z-30"
      :class="classes.backgroundColor"
    >
      <BaseIcon :icon="classes.icon" color="white" />
      {{ snackbar.message }}
    </div>
  </Transition>
</template>
