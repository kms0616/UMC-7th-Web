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
      refreshAndFetchUser(); // 초기 로드 시 토큰 갱신 후 사용자 정보 가져오기
    }
  }, []);

  // accessToken 갱신 + 사용자 정보 가져오기
  const refreshAndFetchUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('Refresh token not found');
      return;
    }

    try {
      // refreshToken으로 accessToken 갱신
      const { data } = await api.post('/auth/token/access', {
        refreshToken,
      });
      const { accessToken } = data;

      localStorage.setItem('accessToken', accessToken); // 새 accessToken 저장

      // 갱신된 accessToken으로 사용자 정보 가져오기
      const userResponse = await api.get('/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setUser(userResponse.data); // 사용자 정보 상태 저장
      localStorage.setItem('user', JSON.stringify(userResponse.data)); // 로컬스토리지에 저장
    } catch (error) {
      console.error('Token refresh or user fetch failed', error);
      handleLogout(); // 실패 시 로그아웃
    }
  };

  const fetchUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    try {
      const response = await api.get('/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(response.data); // 사용자 정보 상태 저장
      localStorage.setItem('user', JSON.stringify(response.data)); // 로컬스토리지에 저장
    } catch (error) {
      console.error('Failed to fetch user', error);
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
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
