<script setup lang="ts">
const isChecked = defineModel<boolean>({ default: false });
</script>

<template>
  <input
    v-model="isChecked"
    type="checkbox"
    class="accent-primary cursor-pointer"
  />
</template>
