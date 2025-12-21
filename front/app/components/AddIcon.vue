<script setup lang="ts">
const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <BaseIcon
    icon="plus"
    color="white"
    class="fixed bottom-8 right-8 bg-primary hover:bg-primary-strong shadow-xl rounded-full p-4 !w-4"
    is-clickable
    @click="emit('click')"
    @keydown.enter="emit('click')"
  />
</template>
