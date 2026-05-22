import type { ColorTokens } from "@/types/design-token";

/* ──────────────────────────────────────────────
 * 優先度データの検索
 * ────────────────────────────────────────────── */
const findPriority = (priority: number) => {
  return Object.values(PRIORITY).find((p) => p.value === priority);
};

/* ──────────────────────────────────────────────
 * ラベル取得
 * ────────────────────────────────────────────── */
/** 優先度の数値をラベルに変換する */
export const formatPriorityLabel = (priority: number): string => {
  return findPriority(priority)?.label ?? "不明";
};

/* ──────────────────────────────────────────────
 * テーマカラー取得
 * ────────────────────────────────────────────── */
/** 優先度に対応する色を取得する */
export const formatPriorityColor = (priority: number): ColorTokens => {
  return findPriority(priority)?.color ?? "info";
};
