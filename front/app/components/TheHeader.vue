<script setup lang="ts" />

<template>
  <header>
    <NuxtLink to="/" class="logo-link">
      <img src="/assets/img/logo.svg" alt="TODO"
    /></NuxtLink>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  height: 3.5rem;
  display: flex;
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
}
</style>
