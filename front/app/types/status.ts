// 共通構造
type BaseStatus = {
  name: string;
  order: number;
};

// GETレスポンス
export type Status = BaseStatus & {
  id: number;
  is_updatable: number;
};

// POSTリクエスト
export type CreateStatusRequest = BaseStatus;

// PUTリクエスト
export type UpdateStatusRequest = BaseStatus;
