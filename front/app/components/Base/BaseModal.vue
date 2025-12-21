<script setup lang="ts">
export type BaseModalProps = {
  title: string;
};
defineProps<BaseModalProps>();

const isShow = defineModel<boolean>("isShow");

/** モーダルを閉じる */
const closeModal = () => {
  isShow.value = false;
};

/** 背景をクリックしたらモーダルを閉じる */
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

/** Escキーでモーダルを閉じる */
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isShow.value) {
    closeModal();
  }
};
onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

defineExpose({
  closeModal,
});
</script>

<template>
  <div
    v-if="isShow"
    class="fixed inset-0 bg-black bg-opacity-50 z-10"
    @click="handleBackdropClick"
  >
    <div
      class="absolute inset-0 bg-white rounded-md shadow-lg max-w-max max-h-max m-auto"
    >
      <div class="flex justify-between items-center p-4 border-b">
        <BaseText size="large" bold>{{ title }}</BaseText>
        <BaseIcon
          icon="close"
          tabindex="0"
          is-clickable
          @click="closeModal"
          @keydown.enter="closeModal"
        />
      </div>
      <div class="p-4">
        <slot name="content" />
      </div>
      <div class="p-4 border-t flex justify-end gap-4">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
