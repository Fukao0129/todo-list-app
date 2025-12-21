<script setup lang="ts">
import type { Todo, UpdateTodoRequest } from "@/types/todo";
import type { Status } from "@/types/status";
import type { SelectOption } from "@/types/select-option";

const props = withDefaults(
  defineProps<{
    todo: Todo;
    isTrash?: boolean;
    statuses?: Status[];
  }>(),
  {
    isTrash: false,
  }
);

const emit = defineEmits<{
  onClickSubmit: [UpdateTodoRequest]; // 編集
  onCheck: [boolean, UpdateTodoRequest]; // 完了/未完了切替
  onTrash: [UpdateTodoRequest]; // ゴミ箱へ移動
  onRestore: [UpdateTodoRequest]; // ゴミ箱から戻す
}>();

const { validationErrors, clearErrorMessages } = useValidationErrors();

const formData = ref<UpdateTodoRequest>({ ...props.todo }); // フォーム
const isOpen = ref(false); // 詳細表示フラグ
const isEditMode = ref(false); // 編集モードフラグ
const isCompleted = props.todo.status_id === DEFAULT_STATUSES.COMPLETED.value; // 完了しているか

/** 編集モードになったらタイトル入力欄にフォーカスする */
watch(isEditMode, (newVal) => {
  clearErrorMessages();
  if (newVal) {
    nextTick(() => {
      focusOnElement(".todo-title input");
    });
  }
});
</script>

<template>
  <BaseCard
    class="relative"
    :variant="
      todo.status_id == DEFAULT_STATUSES.COMPLETED.value ? 'disabled' : 'white'
    "
  >
    <!-- 優先度ラベル -->
    <TodoCardPriorityLabel :priority="todo.priority" />

    <!--上部-->
    <TodoCardHeader
      v-model:is-open="isOpen"
      :todo
      :is-trash
      :is-completed
      @onCheck="emit('onCheck', $event, todo)"
    />

    <!--詳細-->
    <div v-if="isOpen" class="relative p-4 border-t border-neutral-subtle">
      <TodoCardControls
        v-model:is-edit-mode="isEditMode"
        :is-trash
        @onTrash="emit('onTrash', todo)"
        @onRestore="emit('onRestore', todo)"
      />

      <form
        class="flex flex-col gap-4"
        @submit.prevent="emit('onClickSubmit', formData)"
      >
        <div class="mr-20">
          <BaseInput
            v-model:text="formData.title"
            v-if="isEditMode"
            placeholder="タイトルを入力"
            class="todo-title"
            :error-message="validationErrors['update-todo.title']"
          />
          <BaseText v-else bold>{{ todo.title }}</BaseText>
        </div>

        <div class="p-4 whitespace-pre-wrap bg-slate-100">
          <BaseTextarea
            v-if="isEditMode"
            v-model:text="formData.description"
            placeholder="説明文を入力"
          />
          <BaseText v-else size="small" color="secondary">
            {{ todo.description ?? "説明文がありません" }}
          </BaseText>
        </div>

        <div>
          <FormItem label="ステータス">
            <BaseSelect
              v-if="isEditMode"
              v-model:selected-value="formData.status_id"
              :options="statuses as SelectOption[]"
            />
            <BaseText v-else>{{ todo.status.name }}</BaseText>
          </FormItem>
          <FormItem label="優先度">
            <BaseSelect
              v-if="isEditMode"
              v-model:selected-value="formData.priority"
              :options="
                Object.values(PRIORITY).map((priority) => ({
                  id: priority.value,
                  name: priority.label,
                }))
              "
            />
            <BaseText v-else :color="formatPriorityColor(todo.priority)" bold>
              {{ formatPriorityLabel(todo.priority) }}
            </BaseText>
          </FormItem>
          <FormItem label="リマインド">
            <input
              v-if="isEditMode"
              v-model="formData.reminder_at"
              type="datetime-local"
              name="reminder_at"
            />
            <BaseText v-else>{{ todo.reminder_at ?? "未設定" }}</BaseText>
          </FormItem>
          <FormItem label="期日">
            <input
              v-if="isEditMode"
              v-model="formData.due_date"
              type="datetime-local"
              name="due_date"
            />
            <BaseText v-else>{{ todo.due_date ?? "未設定" }}</BaseText>
          </FormItem>
        </div>

        <!--下部-->
        <TodoCardFooter v-if="isEditMode" v-model:is-edit-mode="isEditMode" />
      </form>
    </div>
  </BaseCard>
</template>
