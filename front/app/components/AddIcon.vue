<script setup lang="ts">
const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <BaseIcon
    icon="plus"
    color="white"
    class="add-icon__button"
    is-clickable
    @click="emit('click')"
    @keydown.enter="emit('click')"
  />
</template>

<style scoped>
.add-icon__button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--primary-color);
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  padding: 1rem;
  z-index: 1;
  &:hover {
    background: var(--focus-color);
  }
}
</style>
