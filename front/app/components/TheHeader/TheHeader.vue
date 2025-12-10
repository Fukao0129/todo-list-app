<script setup lang="ts">
const isShowDropdownMenu = ref(false); // ドロップダウンメニュー表示フラグ
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="logo-link">
      <img src="/assets/img/logo.svg" alt="TODO"
    /></NuxtLink>

    <DropdownMenu
      v-model:is-show="isShowDropdownMenu"
      @close-dropdown="isShowDropdownMenu = false"
    >
      <template #trigger>
        <BaseIcon
          icon="circle-user"
          color="white"
          is-clickable
          class="header__user-icon"
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

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  z-index: 1;
  .logo-link {
    display: block;
    width: 7rem;
    height: auto;
    transition: all 200ms 0s ease;
    &:hover {
      opacity: 0.5;
    }
  }
  .header__user-icon {
    font-size: 1.5rem;
  }
}
</style>
