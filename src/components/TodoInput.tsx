import { ChangeEvent } from "react";

interface TodoInputProps {
  inputText: string;
  inputDate: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddTodo: () => void;
}

function TodoInput({ inputText, inputDate, onInputChange, onAddTodo }: TodoInputProps) {
  return (
    <div className="add-todo">
      <input className="add-todo__text" type="text" name="todo-text" placeholder="新しいタスクを入力" value={inputText} onChange={onInputChange} />
      <input className="add-todo__date" type="date" name="todo-date" value={inputDate} onChange={onInputChange}/>
      <button className="add-todo__add-btn" onClick={onAddTodo}>登録</button>
    </div>
  )
}

export default TodoInput

