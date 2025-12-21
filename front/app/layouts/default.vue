<script setup lang="ts" />

<template>
  <TheHeader />

  <div class="flex min-h-screen">
    <TheSidebar />
    <main
      class="w-full ml-sidebar-width mt-header-height bg-slate-100 p-8 flex flex-col gap-4"
    >
      <slot />
    </main>
  </div>
</template>
