<script setup lang="ts">
defineProps<{
  label?: string;
  errorMessage?: string[];
}>();

defineOptions({ inheritAttrs: false });

const text = defineModel<string>();

/** label用のidを生成する */
const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(
  () => (attrs.id ? String(attrs.id) : generatedId), // 継承されたid属性があればそれを使う
);
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <BaseText
      v-if="label"
      size="small"
      color="secondary"
      tag="label"
      :for="inputId"
      >{{ label }}</BaseText
    >
    <input
      v-model="text"
      :id="inputId"
      v-bind="$attrs"
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
