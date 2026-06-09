import { useState, ChangeEvent } from 'react' // useStateは画面上で変化するデータを一時的に記憶しておく関数
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import type { Todo } from './TodoTypes'

function App() {
  // 入力欄の文字を記憶する(初期値は空っぽ)
  const [inputText, setInputText] = useState<string>("")

  // タスクの一覧を一時保持する(初期値は2つのタスクが入った配列)
  const [todos, setTodos] = useState<Todo[]>(
    [
      {id: 1, text: "テスト1テスト1テスト1", isCompleted: false},
      {id: 2, text: "テスト2テスト2テスト2", isCompleted: false}
    ]
  )

  // 入力欄に文字が入力されたとき
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  // ｢追加｣ボタンがクリックされたとき
  const handleAddTodo = () => {
    if (inputText.trim() === "") return

    // 8桁の一意となるIdを作成する
    const generateUniqueId = (currentTodos: Todo[]): number => {
      while (true) {
        const randomId = Math.floor(10000000 + Math.random() * 90000000);
        const isUnique = currentTodos.some(t => t.id === randomId) ? false : true; // randomIdが既に存在していないかの確認
        if (isUnique) return randomId;
      }
    }

    // 新しいタスクを作る
    const newTodo: Todo = {
      id: generateUniqueId(todos),
      text: inputText,
      isCompleted: false
    }

    // タスク一覧のステート更新関数を使って新しいタスクをセットし、入力欄のステートを空にする
    setTodos([...todos, newTodo])
    debugger;
    setInputText("")
  }

  // チェックボックスにチェックが入ったとき
  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map(t => {
      if (t.id === id) {
        return {
          ...t,
          isCompleted: t.isCompleted ? false : true
        }
      }

      return t
    })
    
    setTodos(updatedTodos)
  }

  // 「削除」ボタンがクリックされたとき
  const handleDeleteTodo = (id: number) => {
    const filterTodos = todos.filter(t => t.id !== id)
    setTodos(filterTodos)
  }

  return (
    <div>
      <h1>My Todo List</h1>

      {/* タスク入力エリア */}
      <TodoInput inputText={inputText} onInputChange={handleInputChange} onAddTodo={handleAddTodo}/>
      {/* タスク一覧エリア */}
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} oncheckedTodo={handleToggleTodo}/>
    </div>
  )
}

export default App