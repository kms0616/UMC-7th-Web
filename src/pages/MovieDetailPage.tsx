import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance';
import styled from 'styled-components';

const fetchMovieData = async (movieId: string) => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

const fetchCreditsData = async (movieId: string) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data;
};

const MovieDetailPage: React.FC = () => {
  // 타입을 명시적으로 설정합니다.
  const { movieId } = useParams<{ movieId?: string }>(); // movieId는 string | undefined일 수 있음

  // movieId가 없을 경우 처리
  if (!movieId) {
    return <div>Movie ID is missing!</div>;
  }

  const { data: movie, isLoading: isMovieLoading, error: movieError } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieData(movieId),
  });

  const { data: credits, isLoading: isCreditsLoading, error: creditsError } = useQuery({
    queryKey: ['credits', movieId],
    queryFn: () => fetchCreditsData(movieId),
  });

  if (isMovieLoading || isCreditsLoading) return <div>Loading...</div>;

  if (movieError || creditsError) return <div>Error loading data</div>;

  if (!movie || !credits) return <div>No data found</div>;  // 데이터가 없을 경우 처리

  return (
    <DetailContainer>
      <Content backdrop={movie.backdrop_path}>
        <TextContainer>
          <Title>{movie.title}</Title>
          <Rating>평균 {movie.vote_average}</Rating>
          <ReleaseDate>개봉 {movie.release_date}</ReleaseDate>
          <Overview>{movie.overview}</Overview>
        </TextContainer>
      </Content>

      <h2>감독/출연</h2>
      <CastContainer>
        {credits.cast.map((cast) => (
          <CastMember key={cast.id}>
            {cast.profile_path ? (
              <ProfileImage 
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} 
                alt={cast.name} 
              />
            ) : (
              <PlaceholderImage />
            )}
            <p>{cast.name}</p>
            <p>({cast.character})</p>
          </CastMember>
        ))}
      </CastContainer>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  color: white;
  padding: 20px;
`;

const Content = styled.div<{ backdrop: string }>`
  position: relative;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  background-image: ${({ backdrop }) => `url(https://image.tmdb.org/t/p/w500${backdrop})`};
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
    z-index: 1;
  }
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Rating = styled.p`
  font-size: 18px;
`;

const ReleaseDate = styled.p`
  font-size: 16px;
`;

const Overview = styled.p`
  font-size: 16px;
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`;

const CastMember = styled.div`
  text-align: center;
  flex: 0 0 10%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 5px;
`;

const PlaceholderImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: gray;
  margin-bottom: 5px;
`;

export default MovieDetailPage;
