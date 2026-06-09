import type { Todo } from '../TodoTypes'

// component専用のProps
interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
}

function TodoList({ todos, onDeleteTodo }: TodoListProps) {
  const handleDeleteTodo = onDeleteTodo;

  return (
    <ul>
      {todos.map(t => (
        <li key={t.id}>
          <span>{t.text}</span>
          <button onClick={() => handleDeleteTodo(t.id)}>削除</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList

