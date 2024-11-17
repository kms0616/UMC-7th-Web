import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance';

const usePaginatedMovies = (endpoint) => {
    const [page, setPage] = useState(1);

    const fetchMovies = async (page) => {
        const response = await axiosInstance.get(`${endpoint}?page=${page}`);
        return response.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: [endpoint, page], // queryKey에 페이지 번호 포함
        queryFn: () => fetchMovies(page), // 현재 페이지 데이터를 가져옴
        keepPreviousData: true, // 이전 데이터 유지 (UX 향상)
    });

    const goToNextPage = () => setPage((prev) => prev + 1);
    const goToPrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev)); // 페이지 1 이하로 내려가지 않음

    return { data, isLoading, isError, page, goToNextPage, goToPrevPage };
};

export default usePaginatedMovies;
