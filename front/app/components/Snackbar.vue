<script setup lang="ts">
import type { Snackbar } from "@/types/snackbar";

const snackbar = useState<Snackbar>("snackbar");

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
  <Transition name="snackbar-slide">
    <div
      v-if="snackbar.isShow"
      class="fixed left-4 bottom-4 text-white p-4 shadow-lg"
      :class="classes.backgroundColor"
    >
      <BaseIcon :icon="classes.icon" color="white" />
      {{ snackbar.message }}
    </div>
  </Transition>
</template>

<style scoped>
/* アニメーション設定 */
@keyframes slideInUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.snackbar-slide-enter-active {
  animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.snackbar-slide-leave-active {
  animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards;
}
</style>
