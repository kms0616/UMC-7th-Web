import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios-instance";

// Movie 타입을 정의
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

// useCustomFetch 훅의 반환 타입을 명시
const useCustomFetch = (url: string) => {
    const [data, setData] = useState<Movie[]>([]); // Movie 배열로 타입 지정
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(url);
                setData(response.data.results); // results를 Movie[] 타입으로 설정
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, isLoading, isError };
};

export default useCustomFetch;
