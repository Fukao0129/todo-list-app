<script setup lang="ts">
// セレクトボックスの選択肢はとりあえず固定で書く
// 汎用的に使いたくなったらpropsで受け取るようにする

const q = defineModel<string>("q"); // 検索キーワード
const selectedIndex = defineModel<number>("selectedIndex"); // 選択中のセレクトボックス
const isToggleOn = defineModel<boolean>("isToggleOn"); // トグルのON/OFF
</script>

<template>
  <BaseCard class="flex items-center gap-8 p-4">
    <SearchInput v-model="q" class="flex-auto" />
    <BaseSelect
      v-model="selectedIndex"
      :options="
        SORT_OPTIONS.map((option, index) => ({
          id: index,
          name: option.label,
        }))
      "
    />
    <BaseToggle
      v-model="isToggleOn"
      :label="`${DEFAULT_STATUSES.COMPLETED.label}を除く`"
    />
  </BaseCard>
</template>
