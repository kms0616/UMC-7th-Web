import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos/:id" element={<TodoPage />} />
    </Routes>
  );
}

export default App;
