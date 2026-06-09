import type { Todo } from '../TodoTypes'

// component専用のProps
interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  oncheckedTodo: (id: number) => void;
}

function TodoList({ todos, onDeleteTodo, oncheckedTodo }: TodoListProps) {
  const handleDeleteTodo = onDeleteTodo;
  const handleToggleTodo = oncheckedTodo;

  return (
    <ul className="todo-list">
      {todos.map(t => (
        <li key={t.id} className="todo-list__item">
          <label htmlFor="">
            <input type="checkbox" className="todo-list__checkbox" checked={t.isCompleted} onChange={() => handleToggleTodo(t.id)} name="" id="" />
            <span className={`todo-list__text${t.isCompleted ? ' --completed' : ''}`}>{t.text}</span>
          </label>
          <button className="todo-list__delete-btn" onClick={() => handleDeleteTodo(t.id)}>削除</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList

