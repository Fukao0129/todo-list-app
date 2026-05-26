<script setup lang="ts">
import type { CreateTodoRequest } from "@/types/api";

/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
const route = useRoute();
const category = computed(() => route.params.category);

// リクエストパラメータ
const searchParams = ref({
  sort: "due_date",
  direction: SORT_DIRECTION.ASC.value,
  q: "",
  is_trashed: BOOLEAN.FALSE,
  is_today: category.value === "today" ? BOOLEAN.TRUE : BOOLEAN.FALSE,
});

/** API */
const {
  todoList: todoListData,
  pending,
  addTodo,
  updateTodo,
  trashTodo,
  switchTodoComplete,
  trashCompletedTodos,
} = useTodo(searchParams);

/** ソート条件変更 */
const { selectedSortIndex } = useTodoSort(searchParams);

/** 完了済を除く */
const { isFilterCompleted, filteredTodoList } =
  useCompletedTodoFilter(todoListData);

/** ステータス一覧取得 */
const { statusList } = useStatus();

/* ────────────────────────────────────
 * Todo追加モーダル
 * ──────────────────────────────────── */
const isAddTodoModalVisible = ref(false);

/** Todo追加したらモーダルを閉じる
 * @param formData - 追加するTodoのデータ
 */
const onAddTodo = async (formData: CreateTodoRequest) => {
  return addTodo(formData).then(() => {
    isAddTodoModalVisible.value = false;
  });
};

/* ────────────────────────────────────
 * ページ遷移時
 * ──────────────────────────────────── */
const pageTitle = ref(
  category.value === "today" ? "今日のTodo" : "すべてのTodo",
);
useHead(computed(() => ({ title: pageTitle.value })));
watch(category, (newValue) => {
  if (newValue === "today") {
    searchParams.value.is_today = BOOLEAN.TRUE;
    pageTitle.value = "今日のTodo";
  } else {
    searchParams.value.is_today = BOOLEAN.FALSE;
    pageTitle.value = "すべてのTodo";
  }
});
</script>

<template>
  <NuxtLayout>
    <!--ページ上部-->
    <PageHeader
      :title="pageTitle"
      :data-length="todoListData?.length"
      :breadcrumb="category ? [{ label: pageTitle }] : undefined"
    >
      <template #tools>
        <BaseButton
          v-if="!isFilterCompleted"
          :text="`${DEFAULT_STATUSES.COMPLETED.label}をすべてゴミ箱に移動`"
          left-icon="trash"
          :on-click="trashCompletedTodos"
        />
      </template>
    </PageHeader>

    <!--検索条件-->
    <SearchCard
      v-model:q="searchParams.q"
      v-model:selected-index="selectedSortIndex"
      v-model:is-toggle-on="isFilterCompleted"
    />

    <!--Todo一覧-->
    <AsyncDataCard :data-length="filteredTodoList?.length || 0" :pending>
      <TodoCard
        v-for="todo in filteredTodoList"
        :key="todo.id"
        :todo
        :statuses="statusList"
        @on-click-submit="updateTodo"
        @on-check="switchTodoComplete($event, todo)"
        @on-trash="trashTodo(todo)"
      />
    </AsyncDataCard>
  </NuxtLayout>

  <!--Todo追加-->
  <AddIcon @click="isAddTodoModalVisible = true" />
  <AddTodoModal v-model="isAddTodoModalVisible" :on-submit="onAddTodo" />
</template>
