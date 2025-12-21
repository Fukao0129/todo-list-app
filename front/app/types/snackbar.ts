// スナックバー
import type { SnackbarVariantTokens } from "@/types/design-token";

export type Snackbar = {
  isShow: boolean;
  message: string;
  type: SnackbarVariantTokens;
};
