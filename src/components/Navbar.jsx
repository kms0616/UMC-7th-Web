import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

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
    const navigate = useNavigate();

    return (
        <NavbarContainer>
            <Logo onClick={() => navigate('/')}>MINCHA</Logo>
            <div>
                <Button color="#000" onClick={() => navigate('/login')}>로그인</Button>
                <Button color="#ff0558" onClick={() => navigate('/signup')}>회원가입</Button>
            </div>
        </NavbarContainer>
    );
};

export default Navbar;