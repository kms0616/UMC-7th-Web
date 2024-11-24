import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext'; 
import styled from 'styled-components';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 데이터 가져오기 (useQuery)
const fetchTodos = async () => {
  const response = await fetch('http://localhost:3000/todo');
  if (!response.ok) throw new Error('Todos 데이터를 가져오는 데 실패했습니다.');
  const [data] = await response.json();
  return data || [];
};

// Todo 추가 (useMutation)
const addTodo = async (todo) => {
  const response = await fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Todo 추가 실패');
  return response.json();
};

// Todo 삭제 (useMutation)
const deleteTodo = async (id) => {
  const response = await fetch(`http://localhost:3000/todo/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Todo 삭제 실패');
  return id;
};

// Todo 수정 (useMutation)
const updateTodo = async ({ id, title, content, checked }) => {
  const response = await fetch(`http://localhost:3000/todo/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, checked }), // checked 추가
  });
  if (!response.ok) throw new Error('Todo 수정 실패');
  return response.json();
};

function Home() {
  const { text, setText, taskText, setTaskText } = useContext(TodoContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null); 
  const isFormValid = text.trim() !== "" && taskText.trim() !== "";

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // useQuery로 Todo 목록 가져오기
  const { data: todos, isLoading, error: queryError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  });

  // useMutation 훅들
  const { mutate: handleAddTodo } = useMutation({
    mutationFn: addTodo,
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries(['todos']);
      setText('');
      setTaskText('');
    },
    onError: (err) => setError(err.message),
  });

  const { mutate: handleDeleteTodo } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (id) => {
      queryClient.invalidateQueries(['todos']);
    },
    onError: (err) => setError(err.message),
  });

  const { mutate: handleUpdateTodo } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      setEditingTodo(null);
    },
    onError: (err) => setError(err.message),
  });

  if (isLoading) return <LoadingMessage />;
  if (queryError) {
    return (
      <ErrorMessage 
        error={queryError.message} 
        onRetry={() => queryClient.invalidateQueries(['todos'])} 
      />
    );
  }

  const handleAddTodoSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = text.trim();
    const trimmedContent = taskText.trim();

    if (!trimmedTitle || !trimmedContent) {
      alert("제목과 내용을 모두 입력하세요!");
      return;
    }

    handleAddTodo({ title: trimmedTitle, content: trimmedContent });
  };

  const handleTodoUpdate = (id, updatedTitle, updatedContent) => {
    if (updatedTitle.trim() && updatedContent.trim()) {
      handleUpdateTodo({ id, title: updatedTitle, content: updatedContent });
      window.location.reload();
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  const handleCheckboxChange = (todo) => {
    handleUpdateTodo({
      id: todo.id,
      title: todo.title,
      content: todo.content,
      checked: !todo.checked,
    });
    window.location.reload(); // 새로고침 추가
  };

  return (
    <AppWrapper>
      <ContentWrapper>
        <Header />
        <form onSubmit={handleAddTodoSubmit}>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="제목을 입력하세요" />
          <Input value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder="내용을 입력하세요" />
          <Button label="ToDo 생성" fullWidth disabled={!isFormValid} />
        </form>

        <TodoList>
          {todos?.length > 0 ? (
            todos.map((todo) => (
              <TodoItem key={todo.id}>
                <TodoCheckbox
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => handleCheckboxChange(todo)}
                />
                <TodoId onClick={() => navigate(`/todos/${todo.id}`)}>ID: {todo.id}</TodoId>
                <TodoContent>
                  {editingTodo && editingTodo.id === todo.id ? (
                    <>
                      <Input
                        value={editingTodo.title}
                        onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                      />
                      <Input
                        value={editingTodo.content}
                        onChange={(e) => setEditingTodo({ ...editingTodo, content: e.target.value })}
                      />
                    </>
                  ) : (
                    <>
                      <TodoText>{todo.title}</TodoText>
                      <TodoText>{todo.content}</TodoText>
                    </>
                  )}
                </TodoContent>
                <ButtonWrapper>
                  {editingTodo && editingTodo.id === todo.id ? (
                    <Button
                      label="수정 완료"
                      onClick={() => handleTodoUpdate(todo.id, editingTodo.title, editingTodo.content)}
                    />
                  ) : (
                    <>
                      <Button label="수정" onClick={() => setEditingTodo(todo)} />
                      <Button label="삭제" onClick={() => handleDeleteTodo(todo.id)} />
                    </>
                  )}
                </ButtonWrapper>
              </TodoItem>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </TodoList>
      </ContentWrapper>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  text-align: center;
`;

const TodoList = styled.div`
  margin-top: 20px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

const TodoContent = styled.div`
  flex: 1;
  text-align: left;
`;

const TodoText = styled.p`
  margin: 5px 0;
`;

const TodoId = styled.div`
  margin: 0 10px;
  font-size: 0.9rem;
  color: gray;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const TodoCheckbox = styled.input`
  margin-right: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default Home;
