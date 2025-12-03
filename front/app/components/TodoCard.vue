<script setup lang="ts">
import type { Todo, UpdateTodoRequest } from "@/types/todo";
import type { Status } from "@/types/status";
import type { BaseSelectProps } from "@/components/Base/BaseSelect.vue";

export type TodoCardProps = {
  todo: Todo;
  isTrash?: boolean;
  statuses?: Status[];
};
const props = withDefaults(defineProps<TodoCardProps>(), {
  isTrash: false,
});

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
      focusOnElement(".todo-title__wrapper input");
    });
  }
});
</script>

<template>
  <BaseCard
    class="todo-card"
    :background-color="
      todo.status_id == DEFAULT_STATUSES.COMPLETED.value ? 'lightgray' : 'white'
    "
  >
    <!-- 優先度ラベル -->
    <div
      class="todo__priority-label"
      :style="{
        '--priority-color': `var(--${formatPriorityColor(
          todo.priority
        )}-color)`,
      }"
    ></div>

    <!--上部-->
    <div
      class="todo-card__header"
      tabindex="0"
      @click="isOpen = !isOpen"
      @keydown.enter="isOpen = !isOpen"
    >
      <div>
        <BaseCheckbox
          v-if="!isTrash"
          v-model:isChecked="isCompleted"
          @on-check="emit('onCheck', $event, todo)"
        />
        <BaseText tag="span" color="primary" bold>{{ todo.title }}</BaseText>

        <div class="due-date__wrapper">
          <BaseIcon icon="clock" color="lightgray" :is-clickable="false" />
          <BaseText size="small" color="secondary">{{
            todo.due_date ?? "未設定"
          }}</BaseText>
        </div>
      </div>

      <BaseIcon :icon="isOpen ? 'angle-up' : 'angle-down'" is-clickable />
    </div>

    <!--詳細-->
    <div v-if="isOpen" class="todo-card__detail">
      <div class="todo-edit__header">
        <template v-if="!isTrash">
          <BaseIcon
            color="lightgray"
            icon="pen"
            is-clickable
            @click="isEditMode = !isEditMode"
            @keydown.enter="isEditMode = !isEditMode"
          />
          <BaseIcon
            color="error"
            icon="trash"
            is-clickable
            @click="emit('onTrash', todo)"
            @keydown.enter="emit('onTrash', todo)"
          />
        </template>
        <BaseIcon
          v-else
          color="lightgray"
          icon="rotate-left"
          is-clickable
          @click="emit('onRestore', todo)"
          @keydown.enter="emit('onRestore', todo)"
        />
      </div>

      <form
        class="todo-edit__content"
        @submit.prevent="emit('onClickSubmit', formData)"
      >
        <div class="todo-title__wrapper">
          <BaseInput
            v-model:text="formData.title"
            v-if="isEditMode"
            placeholder="タイトルを入力"
            :error-message="validationErrors['update-todo.title']"
          />
          <BaseText v-else bold>{{ todo.title }}</BaseText>
        </div>

        <div class="todo-description__wrapper">
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
              :options="statuses as BaseSelectProps['options']"
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
        <div v-if="isEditMode" class="todo-edit__footer">
          <BaseButton
            :text="CANCEL_BUTTON_TEXT"
            type="secondary"
            @click="isEditMode = false"
          />
          <BaseButton :text="UPDATE_BUTTON_TEXT" />
        </div>
      </form>
    </div>
  </BaseCard>
</template>

<style scoped>
.todo-card {
  position: relative;
}

.todo-card__header {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 200ms 0s ease;
  &:hover {
    background-color: var(--hover-color);
  }
  .due-date__wrapper {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    font-size: 0.8rem;
    margin-top: 0.2rem;
    margin-left: 0.2rem;
  }
}

.todo-card__detail {
  border-top: 1px solid #ccc;
  padding: 1rem;
  position: relative;
  .todo-edit__header {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.3rem;
  }

  .todo-edit__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .todo-title__wrapper {
      margin-right: 5rem;
    }
    .todo-description__wrapper {
      background: var(--background-color);
      white-space: pre-wrap;
      padding: 1rem;
      textarea {
        display: block;
        width: 100%;
      }
    }
  }
  .todo-edit__footer {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
}

.todo__priority-label {
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  border-right: 0.9rem solid transparent;
  border-radius: 5px 0 0 0;
  border-top: 0.9rem solid var(--priority-color);
}
</style>
