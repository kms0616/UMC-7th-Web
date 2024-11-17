import React from 'react';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import usePaginatedMovies from '../hooks/usePaginatedMovies'; // Custom hook import
import Spinner from '../components/Spinner';

const Skeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '20px', marginTop: '20px' }}>
        {[...Array(20)].map((_, idx) => (
            <div
                key={idx}
                style={{
                    height: '250px',
                    backgroundColor: '#888',
                    borderRadius: '10px',
                    animation: 'pulse 1.5s infinite ease-in-out',
                }}
            />
        ))}
    </div>
);

const PopularPage = () => {
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isError,
        page,
        goToNextPage,
        goToPrevPage,
    } = usePaginatedMovies('/movie/popular'); // Pass the appropriate endpoint

    if (isLoading) {
        return (
            <HomeContainer>
                <Skeleton />
                <LoadingSpinnerContainer>
                    <Spinner />
                </LoadingSpinnerContainer>
            </HomeContainer>
        );
    }

    if (isError) {
        return <div><h1 style={{ color: 'white' }}>에러 중 입니다 ...</h1></div>;
    }

    const handleCardClick = (id) => {
        navigate(`/movies/${id}`);
    };

    return (
        <HomeContainer>
            {data && data.results ? (
                data.results.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        release_date={movie.release_date}
                        onClick={() => handleCardClick(movie.id)}
                    />
                ))
            ) : (
                <div>Loading...</div> // 데이터가 없을 때 표시할 로딩 화면
            )}
    
            <PaginationContainer>
                <PaginationButton onClick={goToPrevPage} disabled={page === 1}>
                    이전
                </PaginationButton>
                <PageNumber>{page}</PageNumber>
                <PaginationButton onClick={goToNextPage} disabled={!data || page === data.total_pages}>
                    다음
                </PaginationButton>
            </PaginationContainer>
        </HomeContainer>
    );
};

export default PopularPage;

const HomeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5px;
    background-color: #000;
    gap: 10px;
    position: relative;
    padding-bottom: 100px;
`;

const LoadingSpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    position: absolute; /* 화면 하단에 고정 */
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
`;

const PaginationButton = styled.button`
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#ff0558')};
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#ccc' : '#e0044e')};
    }
`;

const PageNumber = styled.span`
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin: 0 10px;
`;