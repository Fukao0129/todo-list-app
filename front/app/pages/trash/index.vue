<script setup lang="ts">
import type { Todo, UpdateTodoRequest } from "@/types/todo";

const PAGE_TITLE = "ゴミ箱";
useHead({ title: PAGE_TITLE });

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
  pending,
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
    <!--ページ上部-->
    <PageHeader
      :title="PAGE_TITLE"
      :data-length="todoListData?.length"
      :breadcrumb="[{ label: PAGE_TITLE }]"
    >
      <template #tools>
        <BaseButton
          v-if="todoListData?.length > 0"
          text="ゴミ箱を空にする"
          @click="onBulkDelete"
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
        @on-restore="onRestoreTodo"
      />
      <div v-if="todoListData?.length === 0 && !pending">
        <img
          src="/assets/img/empty-trash.svg"
          alt="ゴミ箱は空っぽ"
          class="max-w-40 mx-auto my-4"
        />
      </div>
    </AsyncDataCard>
  </NuxtLayout>
</template>
