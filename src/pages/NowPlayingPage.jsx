import React from 'react';
import MovieCard from '../components/MovieCard'; // MovieCard import
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance';

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

const fetchNowPlayingMovies = async () => {
    const response = await axiosInstance.get('/movie/now_playing');
    return response.data.results;
};

const NowPlayingPage = () => {
    const { data: movies = [], isLoading, isError } = useQuery({
        queryKey: ['nowPlayingMovies'],
        queryFn: fetchNowPlayingMovies,
    });
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <HomeContainer>
                <Skeleton />
            </HomeContainer>
        );
    }

    if (isError) {
        return <div>
            <h1 style={{color: 'white'}}>에러 중 입니다 ...</h1>
        </div>;
    }

    const handleCardClick = (id) => {
        navigate(`/movies/${id}`);
    };

    return (
        <HomeContainer>
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date}
                    onClick={() => handleCardClick(movie.id)}
                />
            ))}
        </HomeContainer>
    );
};

export default NowPlayingPage;

const HomeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5px;
    background-color: #000;
    gap: 10px;
`;
