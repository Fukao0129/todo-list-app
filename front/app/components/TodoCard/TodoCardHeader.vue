<script setup lang="ts">
import type { Todo } from "@/types/todo";

withDefaults(
  defineProps<{
    todo: Todo;
    isTrash?: boolean;
    isCompleted?: boolean;
  }>(),
  {
    isTrash: false,
    isCompleted: false,
  },
);

const emit = defineEmits<{
  onCheck: [boolean];
}>();

const isOpen = defineModel<boolean>();
</script>

<template>
  <div
    class="flex items-center justify-between cursor-pointer p-2 transition-all hover:bg-primary-subtle"
    tabindex="0"
    @click="isOpen = !isOpen"
    @keydown.enter="isOpen = !isOpen"
  >
    <div>
      <BaseCheckbox
        v-if="!isTrash"
        :model-value="isCompleted"
        @click.stop
        @keydown.enter.stop="emit('onCheck', !isCompleted)"
        @update:model-value="emit('onCheck', !isCompleted)"
      />
      <BaseText tag="span" color="primary" bold class="ml-1">{{
        todo.title
      }}</BaseText>

      <div class="flex items-center gap-0.5 text-xs mt-1 ml-1">
        <BaseIcon icon="clock" color="secondary" />
        <BaseText size="xs" color="secondary">{{
          todo.due_date ?? "未設定"
        }}</BaseText>
      </div>
    </div>

    <BaseIcon :icon="isOpen ? 'angle-up' : 'angle-down'" is-clickable />
  </div>
</template>
