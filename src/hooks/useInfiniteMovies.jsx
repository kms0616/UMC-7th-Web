import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance';

const useInfiniteMovies = (endpoint) => {
    const fetchMovies = async ({ pageParam = 1 }) => {
        const response = await axiosInstance.get(`${endpoint}?page=${pageParam}`);
        return response.data;
    };

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: [endpoint],
        queryFn: fetchMovies,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
    });

    const observerRef = useRef(null);

    const loadMoreMovies = (entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(loadMoreMovies, {
            rootMargin: '100px',
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        observerRef,
    };
};

export default useInfiniteMovies;
