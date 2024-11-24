import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

function Header() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // Header 클릭 시 홈페이지로 이동하는 함수
  const handleClick = () => {
    navigate('/'); // 홈페이지로 이동
  };

  return <StyledHeader onClick={handleClick}>⚡Minseo's ToDoList⚡</StyledHeader>;
}

const StyledHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
`;

export default Header;
