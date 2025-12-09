<script setup lang="ts">
import type { ColorVariant } from "@/constants/colors";

defineProps<{
  icon?: string;
  iconColor?: ColorVariant;
  label: string;
  event: (e?: Event) => void;
}>();
</script>

<template>
  <div
    class="dropdown-menu-item"
    tabindex="0"
    @click="event"
    @keydown.enter="event"
  >
    <BaseIcon v-if="icon" :icon="icon" :color="iconColor || 'secondary'" />
    <BaseText>{{ label }}</BaseText>
  </div>
</template>

<style scoped>
.dropdown-menu-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 200ms 0s ease;
  &:hover {
    background: var(--hover-color);
  }
}
</style>
