// 全体共通型定義
export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  deadline?: string;
  createdAt: string;
}