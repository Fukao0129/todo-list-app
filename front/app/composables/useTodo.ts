import type { Ref } from "vue";
import type { CreateTodoRequest, UpdateTodoRequest, Todo } from "@/types/api";

type TodoSearchParams = {
  sort?: string;
  direction?: string | null;
  q?: string;
  is_trashed?: number;
  is_today?: number;
};

/* ──────────────────────────────────── */

/** Todo関連のAPI操作
 * @param searchParams - 検索用パラメータ
 */
export const useTodo = (searchParams: Ref<TodoSearchParams>) => {
  const { useCustomFetch, callApi } = useApi();
  const { handleError } = useApiErrorHandler();
  const { showSnackbar } = useSnackbar();

  /** Todo一覧取得 */
  const {
    data: todoList,
    pending,
    refresh,
  } = useCustomFetch<Todo[]>("/todos", {
    query: searchParams,
  });

  /** Todo追加 */
  const addTodo = async (formData: CreateTodoRequest): Promise<void> => {
    try {
      await callApi("/todos", { method: "POST", body: formData });
      showSnackbar("Todoを追加しました");
      refresh();
    } catch (error) {
      handleError(error, "add-todo");
      throw error; // ← 呼び出し元のthen防止
    }
  };

  /** Todo更新 */
  const updateTodo = async (
    formData: UpdateTodoRequest & { id: number },
  ): Promise<void> => {
    try {
      await callApi(`/todos/${formData.id}`, { method: "PUT", body: formData });
      showSnackbar("Todoを更新しました");
      refresh();
    } catch (error) {
      handleError(error, "update-todo");
    }
  };

  /** Todoをゴミ箱に移す */
  const trashTodo = async (
    todo: UpdateTodoRequest & { id: number },
  ): Promise<void> => {
    const params = { ...todo, is_trashed: BOOLEAN.TRUE };
    try {
      await callApi(`/todos/${todo.id}`, { method: "PUT", body: params });
      showSnackbar("ゴミ箱に移動しました");
      refresh();
    } catch (error) {
      handleError(error);
    }
  };

  /** Todoの完了⇄未完了を切り替え */
  const switchTodoComplete = async (
    checked: boolean,
    todo: UpdateTodoRequest & { id: number },
  ): Promise<void> => {
    const params = {
      ...todo,
      status_id: checked
        ? DEFAULT_STATUSES.COMPLETED.value
        : DEFAULT_STATUSES.NOT_STARTED.value,
    };
    try {
      await callApi(`/todos/${todo.id}`, { method: "PUT", body: params });
      refresh();
      showSnackbar(
        checked
          ? `Todoを${DEFAULT_STATUSES.COMPLETED.label}にしました`
          : `Todoを${DEFAULT_STATUSES.NOT_STARTED.label}に戻しました`,
      );
    } catch (error) {
      handleError(error);
    }
  };

  /** 完了をすべてゴミ箱に移動する */
  const trashCompletedTodos = async (): Promise<void> => {
    try {
      await callApi("/todos/trash-completed", { method: "PUT" });
      showSnackbar(
        `${DEFAULT_STATUSES.COMPLETED.label}のTodoをすべてゴミ箱に移動しました`,
      );
      refresh();
    } catch (error) {
      handleError(error);
    }
  };

  /** Todoをゴミ箱から戻す */
  const restoreTodo = async (
    todo: UpdateTodoRequest & { id: number },
  ): Promise<void> => {
    const params = { ...todo, is_trashed: BOOLEAN.FALSE };
    try {
      await callApi(`/todos/${todo.id}`, { method: "PUT", body: params });
      showSnackbar("Todoをゴミ箱から戻しました");
      refresh();
    } catch (error) {
      handleError(error);
    }
  };

  /** ゴミ箱を空にする */
  const bulkDelete = async (): Promise<void> => {
    const todo_ids = todoList.value?.map((todo) => todo.id) ?? [];
    try {
      await callApi("/todos", { method: "DELETE", body: { todo_ids } });
      showSnackbar("ゴミ箱を空にしました");
      refresh();
    } catch (error) {
      handleError(error);
    }
  };

  return {
    todoList,
    pending,
    refresh,
    addTodo,
    updateTodo,
    trashTodo,
    switchTodoComplete,
    trashCompletedTodos,
    restoreTodo,
    bulkDelete,
  };
};

/* ──────────────────────────────────── */

/** Todoのソート条件変更
 * @param searchParams - 検索用パラメータ
 */
export const useTodoSort = (searchParams: Ref<TodoSearchParams>) => {
  const selectedSortIndex = ref(0);
  watch(selectedSortIndex, (newValue) => {
    const option = SORT_OPTIONS[newValue];
    if (option) {
      searchParams.value.sort = option.sort;
      searchParams.value.direction = option.direction;
    }
  });
  return {
    selectedSortIndex,
  };
};

/* ──────────────────────────────────── */

/** 完了済のTodoを表示するかのフィルター */
export const useCompletedTodoFilter = (
  todoListData: Ref<Todo[] | undefined>,
) => {
  const isFilterCompleted = ref(true);
  const filteredTodoList = computed(() => {
    if (isFilterCompleted.value) {
      return (
        todoListData.value?.filter(
          (todo) => todo.status_id !== DEFAULT_STATUSES.COMPLETED.value,
        ) || []
      );
    }
    return todoListData.value || [];
  });

  return {
    isFilterCompleted,
    filteredTodoList,
  };
};
