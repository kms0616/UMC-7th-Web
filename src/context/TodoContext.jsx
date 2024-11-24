import React, { createContext, useState } from 'react';

// TodoContext 생성
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {  
  const [todos, setTodos] = useState([]);  
  const [text, setText] = useState('');
  const [taskText, setTaskText] = useState('');

  const addTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      title: text,
      content: taskText,
      checked: false,
    };
    setTodos([...todos, newTodo]);  
    setText('');
    setTaskText('');
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, text, setText, taskText, setTaskText, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
