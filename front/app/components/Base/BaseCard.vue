<script setup lang="ts">
export type BaseModalProps = {
  backgroundColor?: "white" | "disabled";
};
withDefaults(defineProps<BaseModalProps>(), {
  backgroundColor: "white",
});
</script>

<template>
  <div class="card" :class="`card--${backgroundColor}`">
    <slot />
  </div>
</template>

<style scoped>
.card {
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 100%;
}

/** 種類によって背景色を変える */
.card--white {
  background: white;
}
.card--disabled {
  background: var(--disabled-color);
}
</style>
