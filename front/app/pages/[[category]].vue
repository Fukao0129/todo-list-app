<script setup lang="ts">
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "@/types/todo";
import type { Status } from "@/types/status";

const route = useRoute();
const { showSnackbar } = useSnackbar();
const { useCustomFetch, callApi } = useApi();
const { setErrorMessages } = useValidationErrors();

const category = route.params.category as string | undefined;
const isShowAddTodoModal = ref(false); // Todo追加モーダル表示フラグ

// リクエストパラメータ
const searchParams = ref({
  sort: "due_date",
  direction: SORT_DIRECTION.ASC.value,
  q: "",
  is_trashed: BOOLEAN.FALSE,
  is_today: BOOLEAN.FALSE,
});

/** Todo一覧取得 */
const {
  data: todoListData,
  pending,
  refresh,
} = useCustomFetch<Todo[]>(`/todos`, {
  query: searchParams.value,
});

/** 完了済を除く */
const isFilterCompleted = ref(true);
const filteredTodoList = computed(() => {
  if (isFilterCompleted.value) {
    return (
      todoListData.value?.filter(
        (todo) => todo.status_id !== DEFAULT_STATUSES.COMPLETED.value
      ) || []
    );
  }
  return todoListData.value || [];
});

/** ステータス一覧取得 */
const { data: statusData } = useCustomFetch<Status[]>(`/statuses`);

/** Todo追加 */
const onAddTodo = (formData: CreateTodoRequest) => {
  callApi(`/todos`, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      isShowAddTodoModal.value = false;
      showSnackbar("Todoを追加しました");
      refresh();
    })
    .catch((error) => {
      setErrorMessages(error.data.errorMessage, "add-todo");
    });
};

/** Todo更新 */
const onUpdateTodo = (formData: UpdateTodoRequest) => {
  callApi(`/todos/${formData.id}`, {
    method: "PUT",
    body: formData,
  })
    .then(() => {
      showSnackbar("Todoを更新しました");
      refresh();
    })
    .catch((error) => {
      setErrorMessages(error.data.errorMessage, "update-todo");
    });
};

/** Todoをゴミ箱に移す */
const onTrashTodo = (todo: UpdateTodoRequest) => {
  const params = { ...todo, is_trashed: BOOLEAN.TRUE };
  callApi(`/todos/${params.id}`, {
    method: "PUT",
    body: params,
  })
    .then(() => {
      showSnackbar("ゴミ箱に移動しました");
      refresh();
    })
    .catch((error) => {
      showSnackbar(error.message, "error");
    });
};

/** Todoの完了⇄未完了を切り替え */
const onSwitchTodoComplete = (checked: boolean, todo: UpdateTodoRequest) => {
  const params = {
    ...todo,
    status_id: checked
      ? DEFAULT_STATUSES.COMPLETED.value
      : DEFAULT_STATUSES.NOT_STARTED.value,
  };
  callApi(`/todos/${params.id}`, {
    method: "PUT",
    body: params,
  })
    .then(() => {
      refresh();
      showSnackbar(
        checked
          ? `Todoを${DEFAULT_STATUSES.COMPLETED.label}にしました`
          : `Todoを${DEFAULT_STATUSES.NOT_STARTED.label}に戻しました`
      );
    })
    .catch((error) => {
      showSnackbar(error.message, "error");
    });
};

/** 完了をすべてゴミ箱に移動する */
const onTrashCompletedTodos = () => {
  callApi(`/todos/trash-completed`, {
    method: "PUT",
  })
    .then(() => {
      showSnackbar(
        `${DEFAULT_STATUSES.COMPLETED.label}のTodoをすべてゴミ箱に移動しました`
      );
      refresh();
    })
    .catch((error) => {
      showSnackbar(error.message, "error");
    });
};

/** ソート条件変更 */
const selectedSortIndex = ref(0);
const onSortChange = (event: Event) => {
  selectedSortIndex.value = parseInt((event.target as HTMLSelectElement).value);
  const option = SORT_OPTIONS[selectedSortIndex.value];
  if (option) {
    searchParams.value.sort = option.sort;
    searchParams.value.direction = option.direction;
  }
};

/** ページ遷移時 */
const pageTitle = ref("");
watch(
  () => category,
  (newValue) => {
    if (newValue === "today") {
      searchParams.value.is_today = BOOLEAN.TRUE;
      pageTitle.value = "今日のTodo";
    } else {
      searchParams.value.is_trashed = BOOLEAN.FALSE;
      pageTitle.value = "すべてのTodo";
    }
    useHead({ title: pageTitle.value });
  },
  { immediate: true }
);
</script>

<template>
  <NuxtLayout>
    <BreadCrumb v-if="category" :breadcrumb="[{ label: pageTitle }]" />

    <h1>{{ pageTitle }}</h1>

    <!--検索条件-->
    <BaseCard>
      <div class="search-area__wrapper">
        <SearchInput v-model:search-text="searchParams.q" />
        <BaseSelect
          v-model:selected-value="selectedSortIndex"
          :options="
            SORT_OPTIONS.map((option, index) => ({
              id: index,
              name: option.label,
            }))
          "
          @change="onSortChange($event)"
        />
        <BaseToggle
          v-model:is-on="isFilterCompleted"
          :label="`${DEFAULT_STATUSES.COMPLETED.label}を除く`"
        />

        <BaseButton
          v-if="!isFilterCompleted"
          :text="`${DEFAULT_STATUSES.COMPLETED.label}をすべてゴミ箱に移動`"
          left-icon="trash"
          class="trash-all__button"
          @click="onTrashCompletedTodos"
        />
      </div>
    </BaseCard>

    <!--件数表示-->
    <DataCount :data-length="filteredTodoList?.length" />

    <!--Todo一覧-->
    <AsyncDataCard :data-length="filteredTodoList?.length || 0" :pending>
      <TodoCard
        v-for="todo in filteredTodoList"
        :key="todo.id"
        :todo
        :statuses="statusData"
        @on-click-submit="onUpdateTodo"
        @on-check="onSwitchTodoComplete"
        @on-trash="onTrashTodo"
      />
    </AsyncDataCard>
  </NuxtLayout>

  <AddIcon @click="isShowAddTodoModal = true" />
  <AddTodoModal v-model:is-show="isShowAddTodoModal" @submit="onAddTodo" />
</template>

<style scoped>
.search-area__wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  .trash-all__button {
    margin-left: auto;
  }
}
</style>
