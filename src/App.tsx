import './App.css'
import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'

function App() {
  const { todos, inputText, inputDate, handleInputChange, handleAddTodo, handleToggleTodo, handleDeleteTodo } = useTodos()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const submitTodo = () => {
    handleAddTodo();
    setIsModalOpen(false)
  }

  return (
    <div className="l-wrap">
      <header className="l-header g-header">
        <h1 className="g-header__ttl">My Todo List</h1>
      </header>

      <div className="l-contents">
        <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} oncheckedTodo={handleToggleTodo}/>

        {isModalOpen && (
          <div className="todo-add-wrap">
            <button type="button" className="todo-add-close" onClick={() => setIsModalOpen(false)} aria-label="モーダルを閉じる"></button>
            <TodoInput inputText={inputText} inputDate={inputDate} onInputChange={handleInputChange} onAddTodo={submitTodo} setIsModalOpen={setIsModalOpen}/>
          </div>
        )}
        <div className="todo-add-btn" onClick={() => setIsModalOpen(true)} aria-label="新規タスク追加"></div>
      </div>
    </div>
  )
}

export default App