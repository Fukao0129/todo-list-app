<script setup lang="ts">
withDefaults(
  defineProps<{
    dataLength?: number;
    hasDataLength?: boolean;
    title: string;
    breadcrumb?: { label: string; href?: string }[];
  }>(),
  {
    dataLength: 0,
    hasDataLength: true,
  }
);
</script>

<template>
  <BreadCrumb v-if="breadcrumb" :breadcrumb />

  <div class="flex justify-between items-center">
    <h1 class="flex items-baseline gap-2 text-2xl font-bold">
      {{ title }}
      <BaseText v-if="hasDataLength" size="small" color="secondary" tag="span">
        ({{ dataLength }}件)
      </BaseText>
    </h1>
    <slot name="tools" />
  </div>
</template>
