import type { Todo } from '../TodoTypes'

// component専用のProps
interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  oncheckedTodo: (id: number) => void;
}

function TodoList({ todos, onDeleteTodo, oncheckedTodo }: TodoListProps) {
  // 日付ごとにTodoリストを整形していく
  const dateTodos: {[key: string]: Todo[]} = {};
  todos.forEach(t => {
    const dateKey = t.deadline ? t.deadline : "日付指定なし"
    if (!dateTodos[dateKey]) {
      dateTodos[dateKey] = [];
    }

    dateTodos[dateKey].push(t);
  })

  return (
    <div className="todo-list-wrap">
      {Object.keys(dateTodos).map(date => (
        <div className="todo-list" key={date}>
          <h2 className="todo-list__date">{date}</h2>

        <ul className="todo-list__content">
          {dateTodos[date].map((t, i) => (
            <li key={t.id} className="todo-list__item todo-item">
              <input type="checkbox" className="todo-item__checkbox" checked={t.isCompleted} onChange={() => oncheckedTodo(t.id)} name="" id={`${date}_${i}`} />
              <span className={`todo-item__text${t.isCompleted ? ' --completed' : ''}`}>{t.text}</span>
              <button className="todo-item__delete-btn" onClick={() => onDeleteTodo(t.id)}>削除</button>
            </li>
          ))}
        </ul>
        </div>
      ))}
    </div>
  )
}

export default TodoList

