<script setup lang="ts">
const isEditMode = defineModel<boolean>("isEditMode");
</script>

<template>
  <div class="flex justify-center gap-2">
    <BaseButton
      :text="CANCEL_BUTTON_TEXT"
      color="secondary"
      @click="isEditMode = false"
    />
    <BaseButton :text="UPDATE_BUTTON_TEXT" />
  </div>
</template>
