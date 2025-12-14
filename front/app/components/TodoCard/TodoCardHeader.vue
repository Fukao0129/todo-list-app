<script setup lang="ts">
import type { Todo, UpdateTodoRequest } from "@/types/todo";

withDefaults(
  defineProps<{
    todo: Todo;
    isTrash?: boolean;
    isCompleted?: boolean;
  }>(),
  {
    isTrash: false,
    isCompleted: false,
  }
);

const emit = defineEmits<{
  onCheck: [boolean, UpdateTodoRequest];
}>();

const isOpen = defineModel<boolean>("isOpen");
</script>

<template>
  <div
    class="todo-card-header"
    tabindex="0"
    @click="isOpen = !isOpen"
    @keydown.enter="isOpen = !isOpen"
  >
    <div>
      <BaseCheckbox
        v-if="!isTrash"
        :isChecked="isCompleted"
        @on-check="emit('onCheck', $event, todo)"
      />
      <BaseText
        tag="span"
        color="primary"
        bold
        class="todo-card-header__title"
        >{{ todo.title }}</BaseText
      >

      <div class="todo-card-header__due-date">
        <BaseIcon icon="clock" color="secondary" :is-clickable="false" />
        <BaseText size="small" color="secondary">{{
          todo.due_date ?? "未設定"
        }}</BaseText>
      </div>
    </div>

    <BaseIcon :icon="isOpen ? 'angle-up' : 'angle-down'" is-clickable />
  </div>
</template>

<style scoped>
.todo-card-header {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 200ms 0s ease;
  &:hover {
    background-color: var(--hover-color);
  }
  .todo-card-header__title {
    margin-left: 0.2rem;
  }
  .todo-card-header__due-date {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    font-size: 0.8rem;
    margin-top: 0.2rem;
    margin-left: 0.2rem;
  }
}
</style>
