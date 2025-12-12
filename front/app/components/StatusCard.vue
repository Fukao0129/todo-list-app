<script setup lang="ts">
import type { Status, UpdateStatusRequest } from "@/types/status";
import { cloneDeep } from "lodash";

const props = defineProps<{
  status: Status;
}>();

const emit = defineEmits<{
  onDelete: [number];
  onUpdate: [number, UpdateStatusRequest];
}>();

const { validationErrors, clearErrorMessages } = useValidationErrors();

const isShowDropdownMenu = ref(false); // ドロップダウンメニュー表示フラグ
const isEditMode = ref(false); // 編集モードフラグ
const statusInitName = cloneDeep(props.status.name); // 初期化用

/** 編集モードになったらドロップダウンメニューを閉じて、ステータス名の入力欄にフォーカスする */
watch(isEditMode, (newVal) => {
  clearErrorMessages();
  if (newVal) {
    isShowDropdownMenu.value = false;
    nextTick(() => {
      focusOnElement(".status-edit__wrapper input");
    });
  } else {
    /** 編集モード終了時に入力欄を初期値に戻す */
    props.status.name = statusInitName;
  }
});
</script>

<template>
  <BaseCard class="status-card">
    <BaseText v-if="!isEditMode">{{ status.name }}</BaseText>
    <div v-else class="status-edit__wrapper">
      <BaseInput
        v-model:text="status.name"
        placeholder="ステータス名を入力"
        :error-message="validationErrors['update-status.name']"
      />
      <BaseButton
        :text="CANCEL_BUTTON_TEXT"
        type="secondary"
        @click="isEditMode = false"
      />
      <BaseButton
        :text="UPDATE_BUTTON_TEXT"
        @click="emit('onUpdate', status.id, status)"
      />
    </div>
    <DropdownMenu
      v-model:is-show="isShowDropdownMenu"
      @close-dropdown="isShowDropdownMenu = false"
    >
      <template #trigger>
        <BaseIcon
          v-if="status.is_updatable"
          icon="ellipsis"
          is-clickable
          @click="isShowDropdownMenu = !isShowDropdownMenu"
          @keydown.enter="isShowDropdownMenu = !isShowDropdownMenu"
        />
      </template>

      <template #contents>
        <DropdownMenuItem
          icon="pen"
          label="編集"
          :event="
            () => {
              isEditMode = !isEditMode;
            }
          "
        />
        <DropdownMenuItem
          icon="trash"
          icon-color="error"
          label="削除"
          :event="
            () => {
              emit('onDelete', status.id);
            }
          "
        />
      </template>
    </DropdownMenu>
  </BaseCard>
</template>

<style scoped>
.status-card {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-edit__wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
