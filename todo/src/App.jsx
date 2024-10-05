import React, { useState } from 'react';
import './App.css'
import Input from './components/Input';
import Button from './components/Button';

function App() {
  // 투두리스트  화면에 출력되는 - 추가 삭제 수정 
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
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={addTodo} label="할 일 등록" />
      </form>
      <div className = "todo-list">
        {todos.map((todo, _) => (
          <div key={todo.id} className ="todo-item">
            {editingId !== todo.id ? (
              <>
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </>
            ) : (
              <Input
                defaultValue={todo.task}
                onChange={(e) => setEditText(e.target.value)}
              />
            )}
            <div className="button-container">
              <Button onClick={() => deleteTodo(todo.id)} label="삭제하기" />
            
              {editingId === todo.id ? (
                <Button onClick={() => updateTodo(editingId, editText)} label="수정 완료" />
              ) : (
                <Button onClick={() => setEditingId(todo.id)} label="수정 진행" />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App
