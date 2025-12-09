<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "white" | "disabled";
  }>(),
  {
    variant: "white",
  }
);
</script>

<template>
  <div class="base-card" :class="`base-card--${variant}`">
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 100%;
}

/** 種類によって背景色を変える */
.base-card--white {
  background: white;
}
.base-card--disabled {
  background: var(--disabled-color);
}
</style>
