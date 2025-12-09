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
  <div class="dropdown-menu__wrapper" ref="wrapper">
    <slot name="trigger" />
    <div v-if="isShow" class="dropdown-menu">
      <slot name="contents" />
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu__wrapper {
  position: relative;
}
.dropdown-menu {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: calc(100% + 0.1rem);
  right: calc(100% + 0.1rem);
  background: white;
  width: max-content;
  z-index: 1;
}
</style>
