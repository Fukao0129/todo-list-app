<script setup lang="ts">
import type { Status, UpdateStatusRequest } from "@/types/status";
import { cloneDeep } from "lodash";

export type StatusCardProps = {
  status: Status;
};
const props = defineProps<StatusCardProps>();

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
    <p v-if="!isEditMode">{{ status.name }}</p>
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
        @click="
          emit('onUpdate', status.id, {
            name: status.name,
            order: status.order,
            user_id: status.user_id,
          })
        "
      />
    </div>
    <DropdownMenu
      v-model:is-show="isShowDropdownMenu"
      @closeDropdown="isShowDropdownMenu = false"
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
        <div
          class="dropdown__item"
          tabindex="0"
          @click="isEditMode = !isEditMode"
          @keydown.enter="isEditMode = !isEditMode"
        >
          <BaseIcon icon="pen" />
          <span>{{ EDIT_BUTTON_TEXT }}</span>
        </div>
        <div
          class="dropdown__item"
          tabindex="0"
          @click="emit('onDelete', status.id)"
          @keydown.enter="emit('onDelete', status.id)"
        >
          <BaseIcon icon="trash" color="error" />
          <span>{{ DELETE_BUTTON_TEXT }}</span>
        </div>
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
