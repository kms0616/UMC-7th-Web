import React from 'react';
import styled from 'styled-components';

const MovieCard = ({ title, poster_path, release_date }) => {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p";
    const size = "w500";

    return (
        <CardContainer>
            <ImageContainer>
                <img src ={`${IMG_BASE_URL}/${size}${poster_path}`} alt ={title} />
            </ImageContainer>
            <TextContainer>
                <Title>{title}</Title>
                <ReleaseDate>{release_date}</ReleaseDate>
            </TextContainer>
        </CardContainer>
    );
};

export default MovieCard;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
    background-color: #000;
    border-radius:10px;
    margin: 0px;
    width: 160px;
    color: white;
    position: relative;

    img {
        width: 100%;
        border-radius: 10px;
        height: auto;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;

    &:hover::before {
        content:'';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.3);
        border-radius: 10px;
    }
`;

const TextContainer = styled.div`
    width: 100%;
    margin-top: 5px;
`;

const Title = styled.h6`
    margin: 0;
    font-size: 14px;
    text-align: left;
    color : white;
`;

const ReleaseDate = styled.p`
    margin: 0;
    font-size: 12px;
    color: white;
    text-align: left;
`;