import { FetchError } from "ofetch";
import type { ApiValidationError } from "@/types/api";

/** APIバリデーションエラーかどうかを判定する型ガード
 * @param error - 判定するエラー
 */
const isApiValidationError = (error: unknown): error is ApiValidationError => {
  return (
    error instanceof FetchError &&
    error.data != null &&
    "errorMessage" in error.data
  );
};

/* ──────────────────────────────────── */

/** APIエラーハンドリングの共通処理 */
export const useApiErrorHandler = () => {
  const { showSnackbar } = useSnackbar();
  const { setErrorMessages } = useValidationErrors();

  /**
   * @param error - catchで受け取ったエラー
   * @param validationKey - バリデーションエラーを格納するキー
   */
  const handleError = (error: unknown, validationKey?: string): void => {
    if (isApiValidationError(error)) {
      setErrorMessages(error.data!.errorMessage, validationKey);
    } else {
      showSnackbar((error as Error).message, "error");
    }
  };

  return { handleError };
};
