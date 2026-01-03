<script setup lang="ts">
const { showSidebar } = useSidebar();

const isShowDropdownMenu = ref(false); // ドロップダウンメニュー表示フラグ
</script>

<template>
  <header
    class="fixed top-0 w-full bg-primary text-white p-4 h-header-height flex justify-between items-center z-10 shadow-md"
  >
    <div class="flex items-center">
      <BaseIcon
        icon="bars"
        color="white"
        is-clickable
        class="text-xl md:!hidden"
        @click="showSidebar()"
      />

      <NuxtLink to="/" class="w-28 hover:opacity-50 transition-all">
        <img src="/assets/img/logo.svg" alt="TODO"
      /></NuxtLink>
    </div>

    <DropdownMenu v-model="isShowDropdownMenu">
      <template #trigger>
        <BaseIcon
          icon="circle-user"
          color="white"
          is-clickable
          class="text-2xl"
          @click="isShowDropdownMenu = !isShowDropdownMenu"
          @keydown.enter="isShowDropdownMenu = !isShowDropdownMenu"
        />
      </template>

      <template #contents>
        <TheHeaderMenu />
      </template>
    </DropdownMenu>
  </header>
</template>
