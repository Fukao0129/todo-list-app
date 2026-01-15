import type { ColorTokens } from "@/types/design-token";
import type { PriorityValues } from "@/types/priority";

/** 優先度の数値をラベルに変換する */
export const formatPriorityLabel = (priority: PriorityValues) => {
  return (
    Object.values(PRIORITY).find((p) => p.value === priority)?.label ?? "不明"
  );
};

/** 優先度に対応する色を取得する */
export const formatPriorityColor = (priority: PriorityValues): ColorTokens => {
  return (
    Object.values(PRIORITY).find((p) => p.value === priority)?.color ?? "info"
  );
};
