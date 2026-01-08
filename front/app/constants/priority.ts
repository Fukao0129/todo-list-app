/** Todoの優先度 */
export const PRIORITY = {
  LOW: {
    value: 1,
    label: "低",
    color: "info",
  },
  MEDIUM: {
    value: 2,
    label: "中",
    color: "warning",
  },
  HIGH: {
    value: 3,
    label: "高",
    color: "error",
  },
} as const;
