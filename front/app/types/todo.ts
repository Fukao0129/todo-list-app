import type { PriorityValues } from "@/types/priority";

// 共通構造
type BaseTodo = {
  title: string;
  description: string | null;
  user_id: number;
  status_id: number;
  due_date: string | null;
  priority: PriorityValues;
  reminder_at: string | null;
};

// GETレスポンス
export type Todo = BaseTodo & {
  id: number;
  status: {
    id: number;
    name: string;
  };
  completed_at: string | null;
  reminder_at: string | null;
  created_at?: string;
  updated_at?: string;
};

// POSTリクエスト
export type CreateTodoRequest = BaseTodo;

// PUTリクエスト
export type UpdateTodoRequest = BaseTodo & {
  id: number;
};
