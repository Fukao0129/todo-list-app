<script setup lang="ts">
withDefaults(
  defineProps<{
    isTrash?: boolean;
  }>(),
  {
    isTrash: false,
  },
);

const emit = defineEmits<{
  onTrash: []; // ゴミ箱へ移動
  onRestore: []; // ゴミ箱から戻す
}>();

const isEditMode = defineModel<boolean>();
</script>

<template>
  <div class="absolute top-4 right-4 flex gap-2">
    <template v-if="!isTrash">
      <BaseIcon
        color="secondary"
        icon="pen"
        is-clickable
        @click="isEditMode = !isEditMode"
      />
      <BaseIcon
        color="error"
        icon="trash"
        is-clickable
        @click="emit('onTrash')"
      />
    </template>
    <BaseIcon
      v-else
      color="secondary"
      icon="rotate-left"
      is-clickable
      @click="emit('onRestore')"
    />
  </div>
</template>
