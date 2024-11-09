import React, { useContext, useState } from 'react';
import './App.css'
import Input from './components/Input';
import Button from './components/Button';
import { TodoContext } from './context/TodoContext';

function App() {
  // 투두리스트  화면에 출력되는 - 추가 삭제 수정 
  const {
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
  } = useContext(TodoContext);

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
