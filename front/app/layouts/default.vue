<script setup lang="ts">
withDefaults(
  defineProps<{
    hasSidebar?: boolean;
  }>(),
  {
    hasSidebar: true,
  },
);
const { isSidebarVisible, hideSidebar } = useSidebar();
</script>

<template>
  <!--ヘッダー-->
  <TheHeader />

  <div class="flex min-h-screen">
    <!--サイドバー-->
    <TheSidebar
      v-if="hasSidebar"
      class="fixed top-header-height w-sidebar-width h-[calc(100vh-3.5rem)] z-20 transition-all md:translate-x-0"
      :class="{ 'translate-x-[-10rem] ': !isSidebarVisible }"
    />

    <!--メインコンテンツ-->
    <main
      class="w-full mt-header-height bg-slate-100 p-8 flex flex-col gap-4"
      :class="{ 'md:ml-sidebar-width': hasSidebar }"
    >
      <!--サイドバーオーバーレイ-->
      <div
        v-if="hasSidebar && isSidebarVisible"
        class="absolute inset-0 z-10 bg-black/50 flex items-center justify-center md:hidden"
        @click="hideSidebar()"
      />
      <!--コンテンツスロット-->
      <slot />
    </main>
  </div>
</template>
