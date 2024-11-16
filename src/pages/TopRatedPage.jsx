import React from 'react';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useInfiniteMovies from '../hooks/useInfiniteMovies'; 
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

const TopRatedPage = () => {
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        observerRef,
    } = useInfiniteMovies('/movie/top_rated'); 

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
            {data?.pages.map((page) =>
                page.results.map(movie => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        release_date={movie.release_date}
                        onClick={() => handleCardClick(movie.id)}
                    />
                ))
            )}

            {isFetchingNextPage && (
                <>
                    <Skeleton />
                    <LoadingSpinnerContainer>
                        <Spinner />
                    </LoadingSpinnerContainer>
                </>
            )}

            <div ref={observerRef} />

            {hasNextPage === false && !isFetchingNextPage && (
                <p style={{ color: 'white', textAlign: 'center' }}>더 이상 영화가 없습니다.</p>
            )}
        </HomeContainer>
    );
};

export default TopRatedPage;

const HomeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5px;
    background-color: #000;
    gap: 10px;
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
