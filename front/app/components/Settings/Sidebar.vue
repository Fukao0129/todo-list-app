<script setup lang="ts">
const selectedIIndex = defineModel<number>();
</script>

<template>
  <nav>
    <ul class="flex flex-col">
      <li
        v-for="(menu, index) in SETTING_MENU"
        :key="menu.name"
        class="flex items-center gap-2 text-neutral cursor-pointer py-2 px-4 hover:bg-primary-subtle transition-all"
        :class="{
          ' font-bold border-l-4 border-primary': index === selectedIIndex,
        }"
        @click="() => navigateTo(`/settings/${menu.key}`)"
      >
        <BaseIcon :icon="menu.icon" />
        {{ menu.name }}
      </li>
    </ul>
  </nav>
</template>
