<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder?: string;
    errorMessage?: string[];
    label?: string;
    type?: string;
  }>(),
  {
    type: "text",
  }
);

defineOptions({ inheritAttrs: false });

const text = defineModel<string>();
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <BaseText v-if="label" size="small" color="secondary" tag="label">{{
      label
    }}</BaseText>
    <input
      v-model="text"
      v-bind="$attrs"
      :type
      :placeholder
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
