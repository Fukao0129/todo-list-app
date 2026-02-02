// スナックバー
import type { SnackbarVariantTokens } from "@/types/design-token";

export type Snackbar = {
  isVisible: boolean;
  message: string;
  type: SnackbarVariantTokens;
};
