<script setup lang="ts">
const year = new Date().getFullYear();

const navMenu = [
  { icon: "list", label: "すべて", to: "/" },
  { icon: "calendar-day", label: "今日", to: "/today/" },
  { icon: "trash", label: "ゴミ箱", to: "/trash/" },
  { icon: "gear", label: "ステータス", to: "/status" },
];

/** ページ遷移時にサイドバーを非表示にする */
const { hideSidebar } = useSidebar();
const router = useRouter();
router.afterEach(() => {
  hideSidebar();
});

/** Escキーでサイドバーを非表示にする */
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    hideSidebar();
  }
};
useEventListener("keydown", handleKeydown);
</script>

<template>
  <aside class="bg-white shadow-xl">
    <nav>
      <ul>
        <li v-for="menu in navMenu" :key="menu.to">
          <NuxtLink
            :to="menu.to"
            class="flex items-center gap-2 p-3 hover:bg-primary-subtle underline transition-all"
            :class="{ 'bg-primary-muted': $route.path === menu.to }"
          >
            <BaseIcon :icon="menu.icon" />{{ menu.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <BaseText
      size="small"
      color="secondary"
      class="absolute bottom-4 w-full text-center"
      >&copy; {{ year }} F</BaseText
    >
  </aside>
</template>
