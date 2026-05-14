<script setup lang="ts">
const PAGE_TITLE = "設定";
useHead({ title: PAGE_TITLE });

/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
const route = useRoute();

/* ────────────────────────────────────
 * メニュー切り替え
 * ──────────────────────────────────── */

/** 表示中のメニューインデックス */
const selectedMenuIndex = computed(() =>
  Math.max(
    SETTING_MENU.findIndex((m) => m.key === route.params.menu),
    0,
  ),
);

/** インデックスからアクティブなコンポーネントを取得 */
const activeComponent = computed(() =>
  resolveComponent(
    SETTING_MENU[selectedMenuIndex.value]?.component ??
      "SettingsUserUpdateForm",
  ),
);
</script>

<template>
  <NuxtLayout :has-sidebar="false">
    <PageHeader
      :title="PAGE_TITLE"
      :breadcrumb="[{ label: PAGE_TITLE }]"
      :has-data-length="false"
    />

    <div class="flex gap-12 mt-6">
      <SettingsSidebar v-model="selectedMenuIndex" />
      <component :is="activeComponent" class="flex-1" />
    </div>
  </NuxtLayout>
</template>
