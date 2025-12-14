<script setup lang="ts">
withDefaults(
  defineProps<{
    dataLength: number;
  }>(),
  {
    dataLength: 0,
  }
);
</script>

<template>
  <BaseText size="small" color="secondary" align="right"
    >{{ dataLength }}件</BaseText
  >
</template>
