<script setup lang="ts">
defineProps<{
  priority: number;
}>();
</script>

<template>
  <div
    class="todo-card__priority-label"
    :style="{
      '--priority-color': `var(--${formatPriorityColor(priority)}-color)`,
    }"
  ></div>
</template>

<style scoped>
.todo-card__priority-label {
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  border-right: 0.9rem solid transparent;
  border-radius: 5px 0 0 0;
  border-top: 0.9rem solid var(--priority-color);
}
</style>
