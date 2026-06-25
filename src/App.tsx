import './App.css'
import { useState } from 'react'
import useTodos  from './hooks/useTodos'
import TodoList from './components/TodoList'
import TodoAddModal from './components/TodoAddModal'
import Tabs from './components/TodoListTabs'

export default function App() {
  const { todos, inputText, inputDate, handleInputChange, handleAddTodo, handleToggleTodo, handleDeleteTodo } = useTodos()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tabState, setTabState] = useState("today")

  const submitTodo = () => {
    handleAddTodo();
    setIsModalOpen(false)
  }

  return (
    <div className="l-wrap">
      <header className="l-header g-header">
        <h1 className="g-header__ttl">My Todo List</h1>
      </header>

      <Tabs tabState={tabState} setTabState={setTabState} />

      <div className="l-contents">
        <TodoList todos={todos} tabState={tabState} onDeleteTodo={handleDeleteTodo} oncheckedTodo={handleToggleTodo}/>

        {isModalOpen && (
          <TodoAddModal setIsModalOpen={setIsModalOpen} inputText={inputText} inputDate={inputDate} handleInputChange={handleInputChange} submitTodo={submitTodo} />
        )}
        <div className="todo-add-btn" onClick={() => setIsModalOpen(true)} aria-label="新規タスク追加"></div>
      </div>
    </div>
  )
}