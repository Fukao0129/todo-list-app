/** 各種デザイントークンにenum型を定義する */

// カラー
const COLOR_TOKENS = [
  "primary", // メインカラー
  "default", // テキストカラー
  "secondary", // 補助テキストカラー
  "info", // 情報
  "warning", // 警告
  "error", // エラー
  "white", // 白
] as const;
export type ColorTokens = (typeof COLOR_TOKENS)[number];

// テキストサイズ
const TEXT_SIZE_TOKENS = ["xs", "small", "default", "large"] as const;
export type TextSizeTokens = (typeof TEXT_SIZE_TOKENS)[number];

// ボタンの種類
const BUTTON_VARIANT_TOKENS = ["filled", "outlined"] as const;
export type ButtonVariantTokens = (typeof BUTTON_VARIANT_TOKENS)[number];

// カードの種類
const CARD_VARIANT_TOKENS = ["white", "disabled"] as const;
export type CardVariantTokens = (typeof CARD_VARIANT_TOKENS)[number];

// スナックバーの種類
const SNACKBAR_VARIANT_TOKENS = ["success", "error"] as const;
export type SnackbarVariantTokens = (typeof SNACKBAR_VARIANT_TOKENS)[number];
