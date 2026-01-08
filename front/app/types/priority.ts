/** 優先度の定数から 1 2 3 を enum型として定義する */
export type PriorityValues = (typeof PRIORITY)[keyof typeof PRIORITY]["value"];
