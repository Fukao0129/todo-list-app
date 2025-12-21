<script setup lang="ts">
import type { CreateTodoRequest } from "@/types/todo";

const isShow = defineModel<boolean>("isShow");

const emit = defineEmits<{
  submit: [typeof formData.value];
}>();

const { validationErrors, clearErrorMessages } = useValidationErrors();
const { user } = useUserStore();

// フォーム
const formData = ref<CreateTodoRequest>({
  title: "",
  description: "",
  priority: PRIORITY.LOW.value,
  user_id: user.id,
  status_id: DEFAULT_STATUSES.NOT_STARTED.value,
  due_date: "",
  reminder_at: "",
});

/** 追加ボタン押下 */
const onClickSubmit = () => {
  emit("submit", formData.value);
};

/** タイトルの入力欄にフォーカスする */
watch(isShow, (newVal) => {
  clearErrorMessages();
  if (newVal) {
    nextTick(() => {
      focusOnElement("#add-todo-modal__input input");
    });
  }
});
</script>

<template>
  <BaseModal v-model:is-show="isShow" title="Todoを追加する">
    <template #content>
      <form @submit.prevent="onClickSubmit">
        <FormItem label="タイトル">
          <BaseInput
            v-model:text="formData.title"
            :error-message="validationErrors['add-todo.title']"
            id="add-todo-modal__input"
          />
        </FormItem>
        <FormItem label="説明">
          <BaseTextarea v-model:text="formData.description" />
        </FormItem>
        <FormItem label="優先度">
          <BaseSelect
            v-model:selected-value="formData.priority"
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
        :text="CANCEL_BUTTON_TEXT"
        color="secondary"
        @click="isShow = false"
      />
      <BaseButton :text="ADD_BUTTON_TEXT" @click="onClickSubmit" />
    </template>
  </BaseModal>
</template>
