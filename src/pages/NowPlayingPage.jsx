import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard'; // MovieCard import
import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch';
import { useNavigate } from 'react-router-dom';

const NowPlayingPage = () => {
    const {data: movies, isLoading, isError} = useCustomFetch('/movie/now_playing');
    const navigate = useNavigate();

    if (isLoading) {
        return <div>
            <h1 style={{color: 'white'}}>로딩 중 입니다 ...</h1>
        </div>
    }

    if (isError) {
        return <div>
            <h1 style={{color: 'white'}}>에러 중 입니다 ...</h1>
        </div>
    }

    const handleCardClick = (id) => {
        navigate(`/movies/${id}`)
    };

    return (
        <HomeContainer>
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
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
