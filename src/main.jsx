import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // BrowserRouter import
import App from './App.jsx';
import './index.css';
import { TodoProvider } from './context/TodoContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* BrowserRouter로 App을 감쌈 */}
      <TodoProvider>
        <App />
      </TodoProvider>
    </BrowserRouter>
  </StrictMode>,
);
