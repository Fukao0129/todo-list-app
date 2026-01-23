<script setup lang="ts">
defineProps<{
  label?: string;
  errorMessage?: string[];
}>();

defineOptions({ inheritAttrs: false });

const text = defineModel<string>();

const id = useId(); // ラベル用のID
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <BaseText
      v-if="label"
      size="small"
      color="secondary"
      tag="label"
      :for="id"
      >{{ label }}</BaseText
    >
    <input
      v-model="text"
      v-bind="$attrs"
      :id="id"
      class="p-2 w-full rounded-md border hover:bg-primary-subtle focus:outline-none focus:border-transparent focus:bg-white focus:ring-2 transition-all base-input"
      :class="[
        errorMessage
          ? 'border-error focus:ring-error'
          : 'border-neutral-subtle focus:ring-primary',
      ]"
    />
    <BaseText v-if="errorMessage" size="small" color="error" bold>{{
      errorMessage.join("/ ")
    }}</BaseText>
  </div>
</template>
