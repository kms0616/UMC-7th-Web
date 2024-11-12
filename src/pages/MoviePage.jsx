import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import nowPlayingImage from '../assets/now-playing.jpg';
import popularImage from '../assets/popular.jpg';
import topRatedImage from '../assets/top-rated.jpg';
import upComingImage from '../assets/up-coming.jpg';

const MoviePage = () => {
    const navigate = useNavigate();

    return (
        <MoviesContainer>
            <Title>카테고리</Title>
            <Categories>
                <CategoryBox onClick={() => navigate('/movies/now-playing')} backgroundImage={nowPlayingImage}>
                    <span>현재 상영중인</span>
                </CategoryBox>
                <CategoryBox onClick={() => navigate('/movies/popular')} backgroundImage={popularImage}>
                    <span>인기있는</span>
                </CategoryBox>
                <CategoryBox onClick={() => navigate('/movies/top-rated')} backgroundImage={topRatedImage}>
                    <span>높은 평가를 받은</span>
                </CategoryBox>
                <CategoryBox onClick={() => navigate('/movies/up-coming')} backgroundImage={upComingImage}>
                    <span>개봉 예정중인</span>
                </CategoryBox>
            </Categories>
        </MoviesContainer>
    )
};

export default MoviePage;

const MoviesContainer = styled.div`
    padding: 20px;
    background-color: #000;
    height: 100vh;
`;

const Title = styled.h2`
    color: white;
    font-size:24px;
    margin-bottom: 20px;
`;

const Categories = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const CategoryBox = styled.div`
    width: 300px;
    height: 150px;
    background-color: #222;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    font-size: 15px;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    background-position: center;


    &:hover {
        background-color: #333;
    }

    span {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background-color: rgba(0,0,0,0.5);
        padding: 5px;
        border-radius: 5px;
    }
`;