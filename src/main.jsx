import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { TodoProvider } from './context/TodoContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 인스턴스를 생성합니다.
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* BrowserRouter로 App을 감쌈 */}
      <QueryClientProvider client={queryClient}>  {/* QueryClientProvider로 App을 감쌈 */}
        <TodoProvider>
          <App />
        </TodoProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
