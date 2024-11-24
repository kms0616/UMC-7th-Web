import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext'; 
import styled from 'styled-components';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { todos, setTodos, text, setText, taskText, setTaskText } = useContext(TodoContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null); // 수정 중인 Todo 상태
  const isFormValid = text.trim() !== "" && taskText.trim() !== "";

  const navigate = useNavigate();

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/todo');
        if (!response.ok) throw new Error('Todos 데이터를 가져오는 데 실패했습니다.');
        const [data] = await response.json(); // 첫 번째 배열 추출
        setTodos(data || []); // 배열이 없을 경우 빈 배열로 설정
      } catch (err) {
        setError(err.message || 'Todos 데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };    

    fetchTodos();
  }, [setTodos]);

  

  // Todo 추가
  const handleAddTodo = async (e) => {
    e.preventDefault();
    const trimmedTitle = text.trim();
    const trimmedContent = taskText.trim();

    if (!trimmedTitle || !trimmedContent) {
      alert("제목과 내용을 모두 입력하세요!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmedTitle, content: trimmedContent }),
      });

      if (!response.ok) throw new Error('Todo 추가 실패');
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setText('');
      setTaskText('');
    } catch (err) {
      setError(err.message || 'Todo 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Todo 삭제
  const handleDeleteTodo = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Todo 삭제 실패');
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message || 'Todo 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Todo 체크 상태 변경
  const handleCheckTodo = async (id, checked) => {
    // 기존 상태 저장
    const prevTodos = [...todos];
  
    // Optimistic UI 업데이트
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, checked } : todo))
    );
  
    setLoading(true);
    setError(null);  // 에러 상태 초기화
  
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checked }),
      });
  
      if (!response.ok) throw new Error('체크 상태 변경 실패');
  
      const updatedTodo = await response.json();
  
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        )
      );
    } catch (err) {
      // 실패 시 에러 상태 설정
      setError(err.message || '체크 상태 변경에 실패했습니다.');
      setTodos(prevTodos);  // 실패 시 원래 상태로 롤백
    } finally {
      setLoading(false);
    }
  };
  
  
  // Todo 수정완료
  const handleUpdateTodo = async (id, updatedTitle, updatedContent) => {
    const prevTodos = [...todos];
  
    // Optimistic UI 업데이트
    setTodos(prevTodos.map((todo) => 
      todo.id === id ? { ...todo, title: updatedTitle, content: updatedContent } : todo
    ));
    
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
      });
  
      if (!response.ok) throw new Error('수정 실패');
  
      const updatedTodo = await response.json();
  
      // 성공한 데이터를 상태로 반영
      setTodos((prevTodos) => 
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      // 실패 시 이전 상태로 롤백
      setTodos(prevTodos);
      setError(err.message || '수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  
  if (loading) return <LoadingMessage />;

  if (error && !loading) {
  // 새로고침을 에러 상태가 있을 때만 시도
    window.location.reload();  // 페이지 새로고침

    return (
      <ErrorMessage 
        error={error} 
        onRetry={() => {
          setError(null);  // 에러 상태 초기화
          window.location.reload();  // 새로고침
        }} 
      />
    );
  }


  return (
    <AppWrapper>
      <ContentWrapper>
        <Header />
        {/* Todo 생성 폼 */}
        <form onSubmit={handleAddTodo}>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="제목을 입력하세요" />
          <Input value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder="내용을 입력하세요" />
          <Button label="ToDo 생성" fullWidth disabled={!isFormValid} />
        </form>

        {/* Todo 리스트 */}
        <TodoList>
          {todos?.length > 0 ? (
            todos.map((todo) => (
              <TodoItem key={todo.id}>
                <TodoCheckbox
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => handleCheckTodo(todo.id, !todo.checked)}
                />
                <TodoId onClick={() => navigate(`/todos/${todo.id}`)}>
                  ID: {todo.id}
                </TodoId> {/* ID 표시 */}
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
                      onClick={() => {
                        if (editingTodo.title.trim() && editingTodo.content.trim()) {
                          handleUpdateTodo(todo.id, editingTodo.title, editingTodo.content);
                          setEditingTodo(null); // 수정 완료 후 상태 초기화
                        } else {
                          alert('제목과 내용을 입력해주세요.');
                        }
                      }}
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
  justify-content: flex-start; /* 아이템 왼쪽 정렬 */
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

const TodoContent = styled.div`
  flex: 1;
  text-align: left; /* 텍스트 왼쪽 정렬 */
`;

const TodoText = styled.p`
  margin: 5px 0;
`;

const TodoId = styled.div`
  margin: 0 10px; /* ID와 체크박스 및 목록 사이의 간격 조정 */
  font-size: 0.9rem;
  color: gray;
  cursor: pointer;
  &:hover {
    text-decoration : underline;
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
