<script setup lang="ts">
export type BaseModalProps = {
  title: string;
};
defineProps<BaseModalProps>();

const isShow = defineModel<boolean>();

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
useEventListener("keydown", handleKeydown);

/** モーダル表示中の背景スクロールを防止 */
watch(isShow, (newVal) => {
  document.body.style.overflow = newVal ? "hidden" : "";
});

defineExpose({
  closeModal,
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isShow"
      class="fixed inset-0 bg-neutral bg-opacity-50 z-20 flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
      @click="handleBackdropClick"
    >
      <div class="bg-white rounded-md shadow-lg m-auto max-w-screen-lg w-full">
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
  </Teleport>
</template>
