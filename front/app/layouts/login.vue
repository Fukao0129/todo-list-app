<script setup lang="ts" />

<template>
  <div class="flex justify-center h-screen bg-slate-100">
    <BaseCard
      class="m-auto w-11/12 max-w-md p-8 flex flex-col items-center gap-4 text-center"
    >
      <img src="/assets/img/logo-color.svg" alt="TODO" class="max-w-40" />
      <slot />
    </BaseCard>
  </div>
</template>
