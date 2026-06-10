import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'

function App() {
  const { todos, inputText, inputDate, handleInputChange, handleAddTodo, handleToggleTodo, handleDeleteTodo } = useTodos()

  return (
    <div>
      <h1>My Todo List</h1>

      {/* タスク入力エリア */}
      <TodoInput inputText={inputText} inputDate={inputDate} onInputChange={handleInputChange} onAddTodo={handleAddTodo}/>
      {/* タスク一覧エリア */}
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} oncheckedTodo={handleToggleTodo}/>
    </div>
  )
}

export default App