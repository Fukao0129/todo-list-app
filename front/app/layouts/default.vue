<script setup lang="ts" />

<template>
  <TheHeader />

  <div class="main__wrapper">
    <TheSidebar />
    <main class="main__content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.main__wrapper {
  display: flex;
  min-height: 100vh;
}
.main__content {
  width: 100%;
  background-color: var(--background-color);
  margin-left: 10rem; /* Sidebarの分 */
  margin-top: 3.5rem; /* Headerの分 */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
