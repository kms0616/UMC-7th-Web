import React from 'react';
import { MOVIES } from '../mocks/movies';
import './Movie.css';

const Movie = () => {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/";
    const size = "w500";
                  
    return (
        <div className='movie-container'>
            {MOVIES.results.map((item) => (
                <div key={item.id} className='movie-item'>
                    <img src ={`${IMG_BASE_URL}${size}${item.poster_path}`} alt ={item.original_title} />
                </div>
            ))}
        </div>
    );
};

export default Movie;