import { useState, ChangeEvent } from 'react' // useStateは画面上で変化するデータを一時的に記憶しておく関数
import type { Todo } from '../TodoTypes'

export function useTodos() {
  const [inputText, setInputText] = useState("") // 入力欄の文字を記憶する(初期値は空文字)
  const [inputDate, setInputDate] = useState("") // 入力欄の日付を記憶する(初期値は空文字)

  // タスクの一覧を一時保持する(初期値は2つのタスクが入った配列)
  const [todos, setTodos] = useState<Todo[]>(
    [
      {id: 19384703, text: "テスト1テスト1テスト1", isCompleted: false, deadline: "", createdAt: "2026-06-01"},
      {id: 93787430, text: "テスト2テスト2テスト2", isCompleted: false, deadline: "", createdAt: "2026-06-02"}
    ]
  )

  // 8桁の一意となるIdを作成する
  const generateUniqueId = (currentTodos: Todo[]): number => {
    while (true) {
      const randomId = Math.floor(10000000 + Math.random() * 90000000);
      const isUnique = currentTodos.some(t => t.id === randomId) ? false : true; // randomIdが既に存在していないかの確認
      if (isUnique) return randomId;
    }
  }

  // input枠にテキストが入力されたとき
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === 'todo-date' ? setInputDate(value) : setInputText(value)
  }

  // ｢追加｣ボタンがクリックされたとき
  const handleAddTodo = () => {
    if (inputText.trim() === "") return

    // 新しいタスクを作る
    const newTodo: Todo = {
      id: generateUniqueId(todos),
      text: inputText,
      isCompleted: false,
      deadline: inputDate,
      createdAt: new Date().toISOString()
    }

    // タスク一覧のステート更新関数を使って新しいタスクをセットし、入力欄のステートを空にする
    setTodos([...todos, newTodo])
    setInputText("")
    setInputDate("")
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

  // App.tsx で使いたい「データ」と「関数」をreturnする
  return {
    todos,
    inputText,
    inputDate,
    handleInputChange,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo
  }
}
