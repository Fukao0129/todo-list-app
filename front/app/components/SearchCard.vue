<script setup lang="ts">
// セレクトボックスの選択肢はとりあえず固定で書く
// 汎用的に使いたくなったらpropsで受け取るようにする

const q = defineModel<string>("q"); // 検索キーワード
const selectedIndex = defineModel<number>("selectedIndex"); // 選択中のセレクトボックス
const isToggleOn = defineModel<boolean>("isToggleOn"); // トグルのON/OFF

const emit = defineEmits<{
  onSelectChange: [Event];
}>();
</script>

<template>
  <BaseCard class="search-card">
    <SearchInput v-model:search-text="q" class="search-card__input" />
    <BaseSelect
      v-model:selected-value="selectedIndex"
      :options="
        SORT_OPTIONS.map((option, index) => ({
          id: index,
          name: option.label,
        }))
      "
      @change="emit('onSelectChange', $event)"
    />
    <BaseToggle
      v-model:is-on="isToggleOn"
      :label="`${DEFAULT_STATUSES.COMPLETED.label}を除く`"
    />
  </BaseCard>
</template>

<style scoped>
.search-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  .search-card__input {
    flex: auto;
  }
}
</style>
