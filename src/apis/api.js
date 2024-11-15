import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // 백엔드 서버 URL
});

// 요청 인터셉터로 accessToken 만료 시 처리
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // 401 Unauthorized 처리
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 반복 방지

            try {
                // refreshToken 가져오기
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('Refresh token not found');
                }

                // refreshToken으로 accessToken 갱신
                const { data } = await api.post('/auth/token/access', { 
                    refreshToken // 요청 본문에 refreshToken 전달
                });

                const { accessToken } = data;
                localStorage.setItem('accessToken', accessToken); // 새 accessToken 저장

                // 실패한 요청의 Authorization 헤더를 업데이트
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                
                // 실패한 요청 재시도
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                
                // 로그아웃 처리 (refreshToken 만료 등)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // 로그인 페이지로 리다이렉트
            }
        }

        // 다른 오류는 그대로 반환
        return Promise.reject(error);
    }
);

export default api;
