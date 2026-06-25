import type { Todo } from '../TodoTypes'

// component専用のProps
interface TodoListProps {
  todos: Todo[];
  tabState: string;
  onDeleteTodo: (id: number) => void;
  oncheckedTodo: (id: number) => void;
}

export default function TodoList({ todos, tabState, onDeleteTodo, oncheckedTodo }: TodoListProps) {
  const today = new Date().toISOString().split("T")[0];
  const isTodayTab = tabState === "today";
  const sortByCreatedAtDesc = (a: Todo, b: Todo) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

  const formatDate = (value?: string): string | null => {
    return value ? new Date(value).toISOString().split("T")[0] : null;
  };

  // deadline でグループ化（today タブ用）
  const groupByDeadline = (todoList: Todo[]) => {
    const groups: Array<{ date: string; todos: Todo[] }> = [];

    todoList.forEach(todo => {
      if (todo.isCompleted === true) return;
      
      const dateKey = formatDate(todo.deadline) ?? "日付指定なし";
      const existing = groups.find(g => g.date === dateKey);
      existing ? existing.todos.push(todo) : groups.push({ date: dateKey, todos: [todo] });
    });

    return groups;
  };

  // all タブ用ソート（グループ化なし）
  const sortTodosByCreatedAt = (todoList: Todo[]) => {
    return [...todoList].sort(sortByCreatedAtDesc);
  };

  // today タブ用ソート
  const sortDeadlineGroups = (groups: Array<{ date: string; todos: Todo[] }>) => {
    // 各グループ内のタスクを登録日でソート
    const sortedGroupsWithTodos = groups.map(g => ({ 
      ...g, 
      todos: g.todos.sort(sortByCreatedAtDesc) 
    }));

    // グループを日付順でソート
    const sortedByDate = sortedGroupsWithTodos.sort((a, b) => {
      if (a.date === "日付指定なし") return 1;
      if (b.date === "日付指定なし") return -1;
      if (a.date === today) return -1;
      if (b.date === today) return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return sortedByDate;
  };

  // todo フィルタリング
  const filteredTodos = isTodayTab
    ? todos.filter(t => {
        const deadline = formatDate(t.deadline);
        return deadline === null || deadline <= today;
      })
    : todos;

  // データ整形
  const dateTodos = isTodayTab
    ? sortDeadlineGroups(groupByDeadline(filteredTodos))
    : [{ date: "all", todos: sortTodosByCreatedAt(filteredTodos) }];

  return (
    <div className="todo-list-wrap">
      {dateTodos.map(item => (
        <div className="todo-list" key={item.date}>
          {isTodayTab ? <h2 className="todo-list__date">{item.date}</h2> : null}
          <ul className="todo-list__content">
            {item.todos.map((t, i) => (
              <li key={t.id} className="todo-list__item todo-item">
                <label>
                  <input type="checkbox" className="todo-item__checkbox" checked={t.isCompleted}onChange={() => oncheckedTodo(t.id)} id={`${item.date}_${i}`} />
                  <span className={`todo-item__text${t.isCompleted ? ' --completed' : ''}`}>{t.text}</span>
                </label>
                <button className="todo-item__delete-btn" onClick={() => onDeleteTodo(t.id)}>削除</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}