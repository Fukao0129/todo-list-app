import type { Snackbar } from "@/types/snackbar";

export const useSnackbar = () => {
  // 表示フラグ
  const snackbar = useState<Snackbar>("snackbar", () => ({
    isShow: false,
    message: "",
    type: "success",
  }));

  /** スナックバーを表示する */
  const showSnackbar = (
    message: string,
    type: Snackbar["type"] = "success"
  ) => {
    snackbar.value = { message, type, isShow: true };
  };

  /** 一定時間で非表示にする */
  watch(
    () => snackbar.value.isShow,
    (newVal) => {
      if (newVal) {
        setTimeout(() => {
          snackbar.value.isShow = false;
        }, SHOW_SNACKBAR_TIME);
      }
    }
  );

  return {
    snackbar,
    showSnackbar,
  };
};
