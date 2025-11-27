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
  <div v-if="isShow" class="modal" @click="handleBackdropClick">
    <div class="modal__wrapper">
      <div class="modal__header">
        <BaseText size="large" bold>{{ title }}</BaseText>
        <BaseIcon
          icon="close"
          tabindex="0"
          is-clickable
          @click="closeModal"
          @keydown.enter="closeModal"
        />
      </div>
      <div class="modal__content">
        <slot name="content" />
      </div>
      <div class="modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlay-color);
  z-index: 2;
  .modal__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    .modal__header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .modal__content {
      padding: 1rem;
    }
    .modal__footer {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
      text-align: right;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
}
</style>
