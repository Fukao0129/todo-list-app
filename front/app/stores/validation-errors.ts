import { defineStore } from "pinia";
import type { ValidationErrors } from "@/types/validation-errors";

export const useValidationErrorsStore = defineStore("validationErrors", () => {
  const errorMessages = ref<ValidationErrors>({});

  /** エラーメッセージ設定 */
  const setErrorMessages = (errors: ValidationErrors, key?: string) => {
    if (!key) {
      errorMessages.value = errors;
      return;
    }
    const targetErrors = Object.fromEntries(
      Object.entries(errors).map(([field, val]) => [
        `${key}.${field}`,
        val ?? [],
      ])
    );
    errorMessages.value = targetErrors;
  };

  /** エラーメッセージをクリア */
  const clearErrorMessages = () => {
    errorMessages.value = {};
  };

  return { errorMessages, setErrorMessages, clearErrorMessages };
});
