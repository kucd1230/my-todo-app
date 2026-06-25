import TodoInput from './TodoInput';

interface todoAddModalProps {
  setIsModalOpen: (value: boolean) => void;
  inputText: string;
  inputDate: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitTodo: () => void;
}

export default function TodoAddModal({ setIsModalOpen, inputText, inputDate, handleInputChange, submitTodo }: todoAddModalProps) {

  return (
    <div className="todo-add-wrap">
      <button type="button" className="todo-add-close" onClick={() => setIsModalOpen(false)} aria-label="モーダルを閉じる"></button>
      <TodoInput inputText={inputText} inputDate={inputDate} onInputChange={handleInputChange} onAddTodo={submitTodo} setIsModalOpen={setIsModalOpen}/>
    </div>
  )
}