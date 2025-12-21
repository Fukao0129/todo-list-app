import type { ColorTokens } from "@/types/design-token";

/** 優先度の数値をラベルに変換する */
export const formatPriorityLabel = (priority: number) => {
  return (
    Object.values(PRIORITY).find((p) => p.value === priority)?.label ?? "不明"
  );
};

/** 優先度に対応する色を取得する */
export const formatPriorityColor = (priority: number): ColorTokens => {
  return (
    Object.values(PRIORITY).find((p) => p.value === priority)?.color ?? "info"
  );
};
