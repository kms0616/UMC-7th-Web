import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_TMDB_MOVIE_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'ko-KR',
    },
});

export default axiosInstance;