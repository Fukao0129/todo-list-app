import type {
  CreateStatusRequest,
  UpdateStatusRequest,
  Status,
} from "@/types/api";

/** ステータス関連のAPI操作 */
export const useStatus = () => {
  const { showSnackbar } = useSnackbar();
  const { useCustomFetch, callApi } = useApi();
  const { setErrorMessages } = useValidationErrors();

  /** ステータス一覧取得 */
  const {
    data: statusList,
    pending,
    refresh,
  } = useCustomFetch<Status[]>("/statuses");

  /** ステータス追加 */
  const addStatus = async (formData: CreateStatusRequest): Promise<void> => {
    return callApi("/statuses", { method: "POST", body: formData })
      .then(() => {
        showSnackbar("ステータスを追加しました");
        refresh();
      })
      .catch((error) => {
        setErrorMessages(error.data.errorMessage, "add-status");
        throw error;
      });
  };

  /** ステータス更新 */
  const updateStatus = async (
    formData: UpdateStatusRequest & { id: number },
  ): Promise<void> => {
    return callApi(`/statuses/${formData.id}`, {
      method: "PUT",
      body: formData,
    })
      .then(() => {
        showSnackbar("ステータスを更新しました");
        refresh();
      })
      .catch((error) => {
        setErrorMessages(error.data.errorMessage, "update-status");
        throw error;
      });
  };

  /** ステータス削除 */
  const deleteStatus = async (statusId: number): Promise<void> => {
    return callApi(`/statuses/${statusId}`, { method: "DELETE" })
      .then(() => {
        showSnackbar("ステータスを削除しました");
        refresh();
      })
      .catch((error) => {
        showSnackbar(ERROR_TEXT, "error");
        throw error;
      });
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
