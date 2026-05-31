import type {
  CreateStatusRequest,
  UpdateStatusRequest,
  Status,
} from "@/types/api";

/** ステータス関連のAPI操作 */
export const useStatus = () => {
  const { useCustomFetch, callApi } = useApi();
  const { handleError } = useApiErrorHandler();
  const { showSnackbar } = useSnackbar();

  /** ステータス一覧取得 */
  const {
    data: statusList,
    pending,
    refresh,
  } = useCustomFetch<Status[]>("/statuses");

  /** ステータス追加 */
  const addStatus = async (formData: CreateStatusRequest): Promise<void> => {
    try {
      await callApi("/statuses", { method: "POST", body: formData });
      showSnackbar("ステータスを追加しました");
      refresh();
    } catch (error) {
      handleError(error, "add-status");
      throw error; // ← 呼び出し元のthen防止
    }
  };

  /** ステータス更新 */
  const updateStatus = async (
    formData: UpdateStatusRequest & { id: number },
  ): Promise<void> => {
    try {
      await callApi(`/statuses/${formData.id}`, {
        method: "PUT",
        body: formData,
      });
      showSnackbar("ステータスを更新しました");
      refresh();
    } catch (error) {
      handleError(error, "update-status");
    }
  };

  /** ステータス削除 */
  const deleteStatus = async (statusId: number): Promise<void> => {
    try {
      await callApi(`/statuses/${statusId}`, { method: "DELETE" });
      showSnackbar("ステータスを削除しました");
      refresh();
    } catch (error) {
      handleError(error);
    }
  };

  return {
    statusList,
    pending,
    refresh,
    addStatus,
    updateStatus,
    deleteStatus,
  };
};
