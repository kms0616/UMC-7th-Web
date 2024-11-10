import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // 백엔드 서버 URL
});

// 요청 인터셉터로 accessToken 만료 시 처리
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('/auth/token/access', null, {
                headers: { Authorization: `Bearer ${refreshToken}` }
            });
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default api;
