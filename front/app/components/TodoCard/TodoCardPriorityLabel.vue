<script setup lang="ts">
defineProps<{
  priority: number;
}>();

/** 優先度に応じて色を変える */
const formatPriorityLabelColor = (priority: number): string => {
  switch (priority) {
    case PRIORITY.LOW.value:
      return "border-t-info";
    case PRIORITY.MEDIUM.value:
      return "border-t-warning";
    case PRIORITY.HIGH.value:
      return "border-t-error";
    default:
      return "border-t-transparent";
  }
};
</script>

<template>
  <div
    class="absolute w-0 h-0 top-0 left-0 border-r-[0.9rem] border-r-transparent rounded-[4px_0_0_0] border-t-[0.9rem]"
    :class="formatPriorityLabelColor(priority)"
  ></div>
</template>
