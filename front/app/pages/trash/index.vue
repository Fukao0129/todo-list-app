<script setup lang="ts">
import type { Todo, UpdateTodoRequest } from "@/types/todo";

useHead({ title: "ゴミ箱" });

const { showSnackbar } = useSnackbar();
const { useCustomFetch, callApi } = useApi();

// リクエストパラメータ
const searchParams = ref({
  sort: "due_date",
  direction: SORT_DIRECTION.ASC.value,
  is_trashed: BOOLEAN.TRUE,
  is_today: BOOLEAN.FALSE,
});

/** Todo一覧取得 */
const {
  data: todoListData,
  status,
  refresh,
} = useCustomFetch<Todo[]>(`/todos`, {
  params: searchParams.value,
});

/** Todoをゴミ箱から出す */
const onRestoreTodo = (todo: UpdateTodoRequest) => {
  const params = { ...todo, is_trashed: BOOLEAN.FALSE };
  callApi(`/todos/${todo.id}`, {
    method: "PUT",
    body: params,
  })
    .then(() => {
      showSnackbar("Todoをゴミ箱から戻しました");
      refresh();
    })
    .catch(() => {
      showSnackbar(ERROR_TEXT, "error");
    });
};

/** ゴミ箱を空にする */
const onBulkDelete = () => {
  const todo_ids = todoListData.value?.map((todo) => todo.id) || [];
  callApi(`/todos`, {
    method: "DELETE",
    body: {
      todo_ids,
    },
  })
    .then(() => {
      showSnackbar("ゴミ箱を空にしました");
      refresh();
    })
    .catch(() => {
      showSnackbar(ERROR_TEXT, "error");
    });
};
</script>

<template>
  <NuxtLayout>
    <div class="trash-page__header">
      <h1>ゴミ箱</h1>
      <BaseButton
        text="ゴミ箱を空にする"
        :is-disabled="todoListData?.length === 0"
        @click="onBulkDelete"
      />
    </div>

    <BaseText size="small" color="secondary" align="right"
      >{{ todoListData?.length }}件</BaseText
    >

    <BaseCard class="todo-list__wrapper">
      <BaseText
        v-if="status == 'pending'"
        size="small"
        color="secondary"
        align="center"
        >{{ LOADING_TEXT }}</BaseText
      >
      <TodoCard
        v-else
        v-for="todo in todoListData"
        :key="todo.id"
        :todo
        is-trash
        @on-restore="onRestoreTodo"
      />
      <div v-if="todoListData?.length === 0">
        <img
          src="/assets/img/empty-trash.svg"
          alt="ゴミ箱は空っぽ"
          class="trash-empty__image"
        />
        <BaseText color="secondary" align="center"
          >ゴミ箱は空っぽです。気持ちいいですね！</BaseText
        >
      </div>
    </BaseCard>
  </NuxtLayout>
</template>

<style scoped>
.trash-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-list__wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
.trash-empty__image {
  max-width: 10rem;
  margin: 1rem auto;
}
</style>
