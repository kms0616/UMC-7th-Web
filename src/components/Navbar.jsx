import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { AuthContext } from '../context/AuthContext';

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #ff0558; // 원하는 색상
  cursor: pointer;
  margin-right: auto; // 로고를 왼쪽 정렬
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #1C1C1C; // 네비게이션 바 배경 색상
  color: white;
`;

const Navbar = () => {
  const { user, fetchUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !user) {
      fetchUser(); // 사용자 정보가 없고 로그인 상태일 때만 fetchUser 호출
    }
  }, [user, fetchUser]);

  return (
    <NavbarContainer>
      <Logo onClick={() => navigate('/')}>MINCHA</Logo>
      <div>
        {user ? (
          <>
            <span style={{ color: 'white', marginRight: '20px' }}>
              {user.email.split('@')[0]}님 반갑습니다.
            </span>
            <Button color="#ff0558" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button color="#000" onClick={() => navigate('/login')}>
              로그인
            </Button>
            <Button color="#ff0558" onClick={() => navigate('/signup')}>
              회원가입
            </Button>
          </>
        )}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
