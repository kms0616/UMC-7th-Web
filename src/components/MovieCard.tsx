import React from 'react';
import styled from 'styled-components';

// MovieCard 컴포넌트의 Props 타입 정의
interface MovieCardProps {
  id: number;
  title: string;
  poster_path?: string;  // poster_path는 선택적 prop
  release_date: string;
  onClick: () => void; // onClick은 클릭 시 실행되는 함수
  backgroundImage?: string; // backgroundImage는 선택적 prop
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster_path, release_date, onClick, backgroundImage }) => {
  const IMG_BASE_URL = "https://image.tmdb.org/t/p";
  const size = "w500";

  // poster_path가 없으면 기본 이미지로 대체
  const posterUrl = poster_path ? `${IMG_BASE_URL}/${size}${poster_path}` : '/path/to/default-image.jpg';

  return (
    <CardContainer onClick={onClick} $backgroundImage={backgroundImage}>
      <ImageContainer>
        <img src={posterUrl} alt={title} />
      </ImageContainer>
      <TextContainer>
        <Title>{title}</Title>
        <ReleaseDate>{release_date}</ReleaseDate>
      </TextContainer>
    </CardContainer>
  );
};

export default MovieCard;

const CardContainer = styled.div<{ $backgroundImage?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  background-color: #000;
  border-radius: 10px;
  margin: 0px;
  width: 160px;
  color: white;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 10px;
    height: auto;
  }

  background-image: ${({ $backgroundImage }) => $backgroundImage && `url(${$backgroundImage})`};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  &:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
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
  color: white;
`;

const ReleaseDate = styled.p`
  margin: 0;
  font-size: 12px;
  color: white;
  text-align: left;
`;
