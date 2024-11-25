// src/utils/fetchMovie.js
import axiosInstance from "../apis/axios-instance";

const fetchRandomMovie = async () => {
  try {
    const response = await axiosInstance.get('/movie/popular', {
      params: {
        page: Math.floor(Math.random() * 10) + 1, // 랜덤 페이지에서 영화 하나 가져오기
      },
    });

    const movie = response.data.results[0]; // 첫 번째 영화 선택
    return movie;
  } catch (error) {
    console.error('영화 정보를 불러오는 데 실패했습니다:', error);
    return null;
  }
};

export default fetchRandomMovie;
