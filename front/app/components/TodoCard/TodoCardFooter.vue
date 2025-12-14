<script setup lang="ts">
const isEditMode = defineModel<boolean>("isEditMode");
</script>

<template>
  <div class="todo-card-footer">
    <BaseButton
      :text="CANCEL_BUTTON_TEXT"
      type="secondary"
      @click="isEditMode = false"
    />
    <BaseButton :text="UPDATE_BUTTON_TEXT" />
  </div>
</template>

<style scoped>
.todo-card-footer {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
</style>
