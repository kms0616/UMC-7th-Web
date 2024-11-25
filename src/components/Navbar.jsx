import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { AuthContext } from '../context/AuthContext';

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #ff0558;
  cursor: pointer;
  margin-right: 30px; /* 로고와 메뉴 간 간격 */
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #1c1c1c;
  color: white;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const MenuItem = styled.span`
  font-size: 16px;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  padding-bottom: 2px;

  &:hover {
    color: ${(props) => (props.isDisabled ? '#555' : 'white')};
    text-decoration: ${(props) => (props.isDisabled ? 'none' : 'underline')};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState('');

  const handleMenuClick = (menuName, path) => {
    setActiveMenu(menuName);
    navigate(path);
  };

  return (
    <NavbarContainer>
      {/* 로고와 메뉴 */}
      <MenuContainer>
        <Logo onClick={() => navigate('/')}>MINCHA</Logo>
        <MenuItem isDisabled>구독</MenuItem>
        <MenuItem isDisabled>개별구매</MenuItem>
        <MenuItem isDisabled>웹툰</MenuItem>
        <MenuItem
          isActive={activeMenu === '민챠파티'}
          onClick={() => handleMenuClick('민챠파티', '/party')}
        >
          민챠파티
        </MenuItem>
      </MenuContainer>

      {/* 로그인/회원가입 버튼 */}
      <AuthButtons>
        {user ? (
          <>
            <span style={{ color: 'white', marginRight: '20px' }}>
              {user.email ? user.email.split('@')[0] : '사용자'}님 반갑습니다.
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
      </AuthButtons>
    </NavbarContainer>
  );
};

export default Navbar;
