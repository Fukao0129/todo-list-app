import type { Snackbar } from "@/types/snackbar";

export const useSnackbar = () => {
  // 表示フラグ
  const snackbar = useState<Snackbar>("snackbar", () => ({
    isVisible: false,
    message: "",
    type: "success",
  }));

  /** スナックバーを表示する */
  const showSnackbar = (
    message: string,
    type: Snackbar["type"] = "success",
  ) => {
    snackbar.value = { message, type, isVisible: true };
  };

  /** 一定時間で非表示にする */
  watch(
    () => snackbar.value.isVisible,
    (newVal) => {
      if (newVal) {
        setTimeout(() => {
          snackbar.value.isVisible = false;
        }, SHOW_SNACKBAR_TIME);
      }
    },
  );

  return {
    snackbar,
    showSnackbar,
  };
};
