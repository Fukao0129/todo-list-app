import type { BaseTextProps } from "@/components/Base/BaseText.vue";

/** 優先度の数値をラベルに変換する */
export const formatPriorityLabel = (priority: number) => {
  return (
    Object.values(PRIORITY).find((p) => p.value === priority)?.label ?? "不明"
  );
};

/** 優先度に対応する色を取得する */
export const formatPriorityColor = (
  priority: number
): BaseTextProps["color"] => {
  return (
    Object.values(PRIORITY).find((p) => p.value === priority)?.color ?? "info"
  );
};
