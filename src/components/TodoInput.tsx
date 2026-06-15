import { ChangeEvent, useRef, useEffect } from "react";

interface TodoInputProps {
  inputText: string;
  inputDate: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddTodo: () => void;
  setIsModalOpen: (value: boolean) => void;
}

function TodoInput({ inputText, inputDate, onInputChange, onAddTodo, setIsModalOpen }: TodoInputProps) {
  const textInputRef = useRef<HTMLInputElement>(null);

  // モーダル開時にテキスト入力欄にフォーカス
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  return (
    <div className="todo-add">
      <div className="todo-add__close-btn" onClick={() => setIsModalOpen(false)} aria-label="モーダルを閉じる"></div>
      <input
        className="todo-add__date"
        type="date"
        name="todo-date"
        value={inputDate}
        onChange={onInputChange}
        aria-label="期限日"
      />
      <input
        ref={textInputRef}
        className="todo-add__text"
        type="text"
        name="todo-text"
        placeholder="新しいタスクを入力"
        value={inputText}
        onChange={onInputChange}
        aria-label="タスク内容"
      />
      <button className="todo-add__btn" onClick={onAddTodo}>登録</button>
    </div>
  );
}

export default TodoInput;

