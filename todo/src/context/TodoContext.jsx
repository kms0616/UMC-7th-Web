import { createContext, useState } from 'react';

export const TodoContext = createContext();

export function TodoContextProvider({ children }) {
    const [todos, setTodos] = useState([
        {id : 1, task: '투두 만들어보기'},
        {id : 2, task: '희연 혜원 혜윤 건 찬민'},
    ])
    
    const [text, setText] = useState('');
    const [editingId, setEditingId] = useState('');
    const [editText, setEditText] = useState('');
      //1. 추가하기
      //2. 삭제하기
      //3. 수정하기
    
      //렌더링 방지
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
      //추가하기
      //random()은 0-1 사이 숫자를 반환하기 때문에 100 곱해줌
    const addTodo = () => {
        setTodos((prev) => [
          ...prev,
          {id: Math.floor(Math.random() * 100) + 2, task: text},
        ])
        setText(''); //할 일 등록 후에 초기화하기
    };
    
      //삭제하기 
      //해당하는 부분만 삭제하려면 그 부분 아이디를 받아와서 그거만 삭제해야함
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((item) =>item.id !== id))
    }
    
      //수정하기
    const updateTodo = (id, text) => {
        if (text.trim() !== '') {
          setTodos((prev) =>
            prev.map((item) => (item.id === id ? {...item, task:text}:item))
          );
          setEditingId('');
        }
    }
    return (
        <TodoContext.Provider 
        value={{
        todos,
        setTodos, 
        text, 
        setText, 
        editingId, 
        setEditingId, 
        editText, 
        setEditText, 
        handleSubmit, 
        addTodo, 
        deleteTodo, 
        updateTodo,
    }}
    >
        {children}
        </TodoContext.Provider>
    );
}