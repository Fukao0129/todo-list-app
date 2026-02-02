<script setup lang="ts">
import type { CreateStatusRequest } from "@/types/status";

const isVisible = defineModel<boolean>();

const emit = defineEmits<{
  submit: [typeof formData.value];
}>();

const { validationErrors, clearErrorMessages } = useValidationErrors();
const { user } = useUserStore();

// ステータス追加フォーム
const formData = ref<CreateStatusRequest>({
  name: "",
  order: 0,
  user_id: user.id,
});

/** 追加ボタン押下 */
const onClickSubmit = () => {
  emit("submit", formData.value);
};

/** ステータス名の入力欄にフォーカスする */
watch(isVisible, (newVal) => {
  clearErrorMessages();
  formData.value.name = "";
  if (newVal) {
    nextTick(() => {
      focusOnElement("#add-status-modal__input");
    });
  }
});
</script>

<template>
  <BaseModal v-model="isVisible" title="ステータスを追加する">
    <template #content>
      <form @submit.prevent="onClickSubmit">
        <FormItem label="ステータス名" :has-border="false">
          <BaseInput
            v-model="formData.name"
            placeholder="ステータス名を入力"
            id="add-status-modal__input"
            :error-message="validationErrors['add-status.name']"
          />
        </FormItem>
      </form>
    </template>
    <template #footer>
      <BaseButton
        :text="CANCEL_BUTTON_TEXT"
        color="secondary"
        @click="isVisible = false"
      />
      <BaseButton :text="ADD_BUTTON_TEXT" @click="onClickSubmit" />
    </template>
  </BaseModal>
</template>
