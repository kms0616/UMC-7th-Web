import React, { createContext, useState, useEffect } from 'react';
import api from '../apis/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUser(); // 첫 로드 시 사용자 정보 가져오기
    }
  }, []);

  const fetchUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await api.get('/user/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data); // 사용자 정보 상태에 저장
        localStorage.setItem('user', JSON.stringify(response.data)); // 로컬스토리지에 사용자 정보 저장
      } catch (error) {
        console.error('유저 정보 불러오기 실패', error);
      }
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
