import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import useFetch from '../hooks/useFetch';
import LoadingMessage from '../components/LoadingMessage';  // 로딩 메시지 컴포넌트
import ErrorMessage from '../components/ErrorMessage';    // 에러 메시지 컴포넌트

function TodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo, error, loading } = useFetch(`http://localhost:3000/todo/${id}`); // API 호출
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo) {
      setUpdatedTitle(todo.title);
      setUpdatedContent(todo.content);
      setChecked(todo.checked);
    }
  }, [todo]);

  // Todo 수정
  const handleUpdateTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent, checked }),
      });
  
      const updatedTodo = await response.json();
      navigate(`/todos/${updatedTodo.id}`);
      
      if (!response.ok) throw new Error('수정 실패');
    } catch (err) {
      // 에러 발생 시, 새로고침을 시도하고 이후에도 에러가 있으면 에러 메시지 표시
      window.location.reload();
      
      // 에러가 계속 발생하면 메시지 표시
      alert(err.message || '수정에 실패했습니다.');
    }
  };
  
  
  
  
  // Todo 삭제
  const handleDeleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('삭제에 실패했습니다.');
      navigate('/');  // 삭제 후 홈으로 리다이렉트
    } catch (err) {
      alert(err.message || '삭제에 실패했습니다.');
    }
  };

  if (loading) return <LoadingMessage />;
  if (error || !todo) return <ErrorMessage />;

  return (
    <DetailWrapper>
      <ContentWrapper>
        <Header />
        <TodoDetail>
          <h2>{isEditing ? "Todo 수정" : "Todo 상세"}</h2>
          {isEditing ? (
            <>
              <Input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <Input
                type="text"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <CheckboxWrapper>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label>완료 여부</label>
              </CheckboxWrapper>
              <Button onClick={handleUpdateTodo} label="수정 완료" />
            </>
          ) : (
            <>
              <TodoInfo>
                <p><strong>제목:</strong> {todo.title}</p>
                <p><strong>내용:</strong> {todo.content}</p>
                <p><strong>상태:</strong> {todo.checked ? '완료' : '미완료'}</p>
              </TodoInfo>
              <ButtonWrapper>
                <Button onClick={() => setIsEditing(true)} label="수정" />
                <Button onClick={handleDeleteTodo} label="삭제" />
              </ButtonWrapper>
            </>
          )}
        </TodoDetail>
      </ContentWrapper>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
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

const TodoDetail = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const TodoInfo = styled.div`
  margin: 10px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const CheckboxWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TodoPage;
