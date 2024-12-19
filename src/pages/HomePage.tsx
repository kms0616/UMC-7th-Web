import React from 'react';
import { MOVIES } from '../mocks/HomeMovie';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const HomePage: React.FC = () => {
  const handleClick = (id: number) => {
    // 영화 클릭 시 동작 처리 (예: 상세 페이지로 이동)
    console.log(`영화 ID: ${id}`);
  };

  return (
    <HomeContainer>
      {MOVIES.results.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}  // id 전달
          title={movie.title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          onClick={() => handleClick(movie.id)}  // onClick 전달
          backgroundImage="https://example.com/some-background.jpg" // 선택적 prop 전달
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
