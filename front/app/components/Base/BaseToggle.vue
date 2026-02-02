<script setup lang="ts">
defineProps<{
  label?: string;
}>();

/** ON/OFF切り替え */
const isOn = defineModel<boolean>({ default: false });
const onToggle = () => {
  isOn.value = !isOn.value;
};
</script>

<template>
  <div class="flex items-center gap-1">
    <BaseText
      v-if="label"
      size="small"
      color="secondary"
      tag="label"
      @click="onToggle"
      >{{ label }}</BaseText
    >
    <div
      class="cursor-pointer relative rounded-2xl bg-neutral-subtle w-9 h-5 transition-colors"
      :class="{ 'bg-primary is-on': isOn }"
      tabindex="0"
      role="switch"
      :aria-checked="isOn"
      @click="onToggle"
      @keydown.enter="onToggle"
    >
      <div
        class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-200"
        :class="{ 'left-[calc(100%-1rem-2px)]': isOn }"
      ></div>
    </div>
  </div>
</template>
