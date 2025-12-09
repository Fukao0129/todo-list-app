<script setup lang="ts">
const isChecked = defineModel<boolean>("isChecked");

const emit = defineEmits<{
  onCheck: [boolean];
}>();
</script>

<template>
  <input
    type="checkbox"
    :checked="isChecked"
    class="base-checkbox"
    @click="emit('onCheck', ($event.target as HTMLInputElement)?.checked)"
    @keydown.enter="
      emit('onCheck', !($event.target as HTMLInputElement)?.checked)
    "
  />
</template>

<style scoped>
.base-checkbox {
  accent-color: var(--primary-color);
  cursor: pointer;
}
</style>
