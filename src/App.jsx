// App.jsx
import React from 'react';
import InputTodo from './components/InputTodo.jsx';
import TodoList from './components/TodoList.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
