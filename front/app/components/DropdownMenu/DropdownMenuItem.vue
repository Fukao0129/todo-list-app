<script setup lang="ts">
import type { ColorTokens } from "@/types/design-token";

defineProps<{
  icon?: string;
  iconColor?: ColorTokens;
  label: string;
  event: (e?: Event) => void;
}>();
</script>

<template>
  <div
    class="flex items-center gap-1 py-2 px-4 cursor-pointer hover:bg-primary-subtle transition-all"
    tabindex="0"
    @click="event"
    @keydown.enter="event"
  >
    <BaseIcon v-if="icon" :icon="icon" :color="iconColor || 'secondary'" />
    <BaseText>{{ label }}</BaseText>
  </div>
</template>
