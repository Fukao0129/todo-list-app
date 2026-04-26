<script setup lang="ts">
import type { CreateStatusRequest } from "@/types/api";

const isVisible = defineModel<boolean>();

const props = defineProps<{
  onSubmit: (data: CreateStatusRequest) => Promise<void>;
}>();

const { validationErrors, clearErrorMessages } = useValidationErrors();

// ステータス追加フォーム
const formData = ref<CreateStatusRequest>({
  name: "",
  order: 0,
});

/** 追加ボタン押下 */
const onClickSubmit = () => {
  return props.onSubmit(formData.value);
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
      <form id="add-status-form" @submit.prevent="onClickSubmit">
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
      <BaseButton
        :text="ADD_BUTTON_TEXT"
        type="submit"
        form="add-status-form"
        :on-click="onClickSubmit"
      />
    </template>
  </BaseModal>
</template>
