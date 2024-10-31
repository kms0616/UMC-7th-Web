import React from 'react';
import {MOVIES} from '../mocks/HomeMovie';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';

const HomePage = () => {
    return (
        <HomeContainer>
            {MOVIES.results.map((movie) => (
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date}
                />
            ))}
        </HomeContainer>
    );
};

export default HomePage;

const HomeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5px;
    background-color: #000;
    gap: 10px;
`;
