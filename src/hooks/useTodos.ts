import { useState, useEffect } from 'react' // useStateは画面上で変化するデータを一時的に記憶しておく関数
import type { ChangeEvent } from 'react'
import type { Todo } from '../TodoTypes'

const LOCAL_STORAGE_KEY = 'my-todo-app-todos'

export default function useTodos() {
  const [inputText, setInputText] = useState("") // 入力欄の文字を記憶する(初期値は空文字)
  const [inputDate, setInputDate] = useState("") // 入力欄の日付を記憶する(初期値は空文字)
  const [todos, setTodos] = useState<Todo[]>(() => {
    // 初期値としてlocalStorageからタスクを取得する、localstorageに保存されているタスクがない場合は空配列を返す
    if (typeof window === 'undefined') { return [] }

    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedTodos === null) { return []}

    try {
      return JSON.parse(savedTodos) as Todo[]
    } catch {
      return []
    }
  })

  // Todoの状態が変化するたびにlocalStorageに保存する
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

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

const generateUniqueId = (currentTodos: Todo[]): number => {
  while (true) {
    const randomId = Math.floor(10000000 + Math.random() * 90000000);
    const isUnique = currentTodos.some(t => t.id === randomId) ? false : true; // randomIdが既に存在していないかの確認
    if (isUnique) return randomId;
  }
}