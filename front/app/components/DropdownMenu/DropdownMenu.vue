<script setup lang="ts">
const isShow = defineModel<boolean>("isShow");

/* ドロップダウンメニューの外側がクリックされたら非表示にする */
const wrapper = ref<HTMLElement | null>(null);
const onClickOutside = (event: MouseEvent) => {
  if (!wrapper.value?.contains(event.target as Node)) isShow.value = false;
};

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <div class="relative" ref="wrapper">
    <slot name="trigger" />
    <BaseCard
      v-if="isShow"
      class="absolute right-[calc(100%_+_0.1rem)] w-max z-10"
    >
      <slot name="contents" />
    </BaseCard>
  </div>
</template>
