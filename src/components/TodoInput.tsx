import { ChangeEvent } from "react";

interface TodoInputProps {
  inputText: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddTodo: () => void;
}

function TodoInput({ inputText, onInputChange, onAddTodo }: TodoInputProps) {
  return (
    <div>
      <input type="text" placeholder="新しいタスクを入力" value={inputText} onChange={onInputChange} />
      <button onClick={onAddTodo}>登録</button>
    </div>
  )
}

export default TodoInput

