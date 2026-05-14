<script setup lang="ts">
const PAGE_TITLE = "ゴミ箱";
useHead({ title: PAGE_TITLE });

// リクエストパラメータ
const searchParams = ref({
  sort: "due_date",
  direction: SORT_DIRECTION.ASC.value,
  is_trashed: BOOLEAN.TRUE,
  is_today: BOOLEAN.FALSE,
});

/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
/** API */
const {
  todoList: todoListData,
  pending,
  restoreTodo,
  bulkDelete,
} = useTodo(searchParams);
</script>

<template>
  <NuxtLayout>
    <!--ページ上部-->
    <PageHeader
      :title="PAGE_TITLE"
      :data-length="todoListData?.length"
      :breadcrumb="[{ label: PAGE_TITLE }]"
    >
      <template #tools>
        <BaseButton
          v-if="(todoListData?.length ?? 0) > 0"
          text="ゴミ箱を空にする"
          :on-click="bulkDelete"
        />
      </template>
    </PageHeader>

    <!--ゴミ箱-->
    <AsyncDataCard
      :data-length="todoListData?.length || 0"
      :pending
      no-data-text="ゴミ箱は空っぽです。気持ちいいですね！"
    >
      <TodoCard
        v-for="todo in todoListData"
        :key="todo.id"
        :todo="todo"
        is-trash
        @on-restore="restoreTodo(todo)"
      />
      <div v-if="todoListData?.length === 0 && !pending">
        <img
          src="@/assets/img/empty-trash.svg"
          alt="ゴミ箱は空っぽ"
          class="max-w-40 mx-auto my-4"
        />
      </div>
    </AsyncDataCard>
  </NuxtLayout>
</template>
