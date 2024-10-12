import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const LANGUAGE = 'ko-KR';

export const fetchNowPlayingMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`);
    return response.data.results; 
};

export const fetchPopularMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`);
    return response.data.results;
};

export const fetchTopRatedMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`);
    return response.data.results;
};

export const fetchUpcomingMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}`);
    return response.data.results;
};