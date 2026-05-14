<script setup lang="ts">
import type { CreateTodoRequest } from "@/types/api";

const isVisible = defineModel<boolean>();

const props = defineProps<{
  onSubmit: (data: CreateTodoRequest) => Promise<void>;
}>();

const { validationErrors, clearErrorMessages } = useValidationErrors();

// Todo追加フォーム
const formData = ref<CreateTodoRequest>({
  title: "",
  description: "",
  priority: PRIORITY.LOW.value,
  status_id: DEFAULT_STATUSES.NOT_STARTED.value,
  due_date: "",
  reminder_at: "",
  is_trashed: BOOLEAN.FALSE,
});

/** 追加ボタン押下 */
const onClickSubmit = async () => {
  return props.onSubmit(formData.value);
};

/** タイトルの入力欄にフォーカスする */
watch(isVisible, (newVal) => {
  clearErrorMessages();
  formData.value.title = "";
  if (newVal) {
    nextTick(() => {
      focusOnElement("#add-todo-modal__input");
    });
  }
});
</script>

<template>
  <BaseModal v-model="isVisible" title="Todoを追加する">
    <template #content>
      <form id="add-todo-form" @submit.prevent>
        <FormItem label="タイトル">
          <BaseInput
            v-model="formData.title"
            :error-message="validationErrors['add-todo.title']"
            id="add-todo-modal__input"
          />
        </FormItem>
        <FormItem label="説明">
          <BaseTextarea v-model="formData.description" />
        </FormItem>
        <FormItem label="優先度">
          <BaseSelect
            v-model="formData.priority"
            :options="
              Object.values(PRIORITY).map((priority) => ({
                id: priority.value,
                name: priority.label,
              }))
            "
          />
        </FormItem>
        <FormItem label="リマインド">
          <input
            v-model="formData.reminder_at"
            type="datetime-local"
            name="reminder_at"
          />
        </FormItem>
        <FormItem label="期日" :has-border="false">
          <input
            v-model="formData.due_date"
            type="datetime-local"
            name="due_date"
          />
        </FormItem>
      </form>
    </template>
    <template #footer>
      <BaseButton
        text="キャンセル"
        color="secondary"
        @click="isVisible = false"
      />
      <BaseButton
        text="追加"
        type="submit"
        form="add-todo-form"
        :on-click="onClickSubmit"
      />
    </template>
  </BaseModal>
</template>
