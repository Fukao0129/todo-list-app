<script setup lang="ts">
const isShow = defineModel<boolean>("isShow");

const emit = defineEmits<{
  closeDropdown: [];
}>();

/* ドロップダウンメニューの外側がクリックされたら非表示にする */
const wrapper = ref<HTMLElement | null>(null);
const onClickOutside = (event: MouseEvent) => {
  if (!wrapper.value?.contains(event.target as Node)) emit("closeDropdown");
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
    <div
      v-if="isShow"
      class="absolute bg-white right-[calc(100%_+_0.1rem)] w-max z-10 shadow-xl"
    >
      <slot name="contents" />
    </div>
  </div>
</template>
