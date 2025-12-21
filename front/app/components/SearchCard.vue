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
  <BaseCard class="flex items-center gap-8 p-4">
    <SearchInput v-model:search-text="q" class="flex-auto" />
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
