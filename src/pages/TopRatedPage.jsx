import React, { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../API/tmdb'; // tmdb.js에서 함수 import
import MovieCard from '../components/MovieCard'; // MovieCard import
import styled from 'styled-components';

const TopRatedPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const topRatedMovies = await fetchTopRatedMovies();
            setMovies(topRatedMovies);
        };

        getMovies();
    }, []);

    return (
        <HomeContainer>
            {movies.map(movie => (
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

export default TopRatedPage;

const HomeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5px;
    background-color: #000;
    gap: 10px;
`;
