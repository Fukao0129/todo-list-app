<script setup lang="ts">
const isVisible = defineModel<boolean>();

/* ドロップダウンメニューの外側がクリックされたら非表示にする */
const wrapper = ref<HTMLElement | null>(null);
const onClickOutside = (event: MouseEvent) => {
  if (!wrapper.value?.contains(event.target as Node)) isVisible.value = false;
};
useEventListener("click", onClickOutside);
</script>

<template>
  <div class="relative" ref="wrapper">
    <slot name="trigger" />
    <BaseCard
      v-if="isVisible"
      class="absolute right-[calc(100%_+_0.1rem)] w-max"
    >
      <slot name="contents" />
    </BaseCard>
  </div>
</template>
