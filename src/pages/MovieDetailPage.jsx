import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // useQuery 훅을 import
import axiosInstance from '../apis/axios-instance';
import styled from 'styled-components';

const fetchMovieData = async (movieId) => {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
};

const fetchCreditsData = async (movieId) => {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data;
};

const MovieDetailPage = () => {
    const { movieId } = useParams();

    // 영화 데이터 가져오기
    const { data: movie, isLoading: isMovieLoading, error: movieError } = useQuery({
        queryKey: ['movie', movieId], // queryKey를 객체로 지정
        queryFn: () => fetchMovieData(movieId), // 데이터 fetching 함수
    });

    // 감독/출연 정보 가져오기
    const { data: credits, isLoading: isCreditsLoading, error: creditsError } = useQuery({
        queryKey: ['credits', movieId], // queryKey를 객체로 지정
        queryFn: () => fetchCreditsData(movieId), // 데이터 fetching 함수
    });

    // 로딩 중일 때
    if (isMovieLoading || isCreditsLoading) return <div>Loading...</div>;

    // 에러 처리
    if (movieError || creditsError) return <div>Error loading data</div>;

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
                            <PlaceholderImage /> // 사진이 없을 경우 기본 원 모양
                        )}
                        <p>{cast.name}</p>
                        <p>({cast.character})</p>
                    </CastMember>
                ))}
            </CastContainer>
        </DetailContainer>
    );
};

// 스타일링
const DetailContainer = styled.div`
    color: white;
    padding: 20px;
`;

const Content = styled.div`
    position: relative;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    margin-bottom: 20px;
    overflow: hidden;
    background-image: ${({ backdrop }) => `url(https://image.tmdb.org/t/p/w500${backdrop})`}; /* backdrop을 이용한 스타일 설정 */
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
    justify-content: flex-start; /* 좌측 정렬 */
`;

const CastMember = styled.div`
    text-align: center;
    flex: 0 0 10%; /* 한 줄에 10명씩 표시 */
    margin-bottom: 20px; /* 아래쪽 마진 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 중앙 정렬 */
`;

const ProfileImage = styled.img`
    width: 70px; /* 이미지 너비 */
    height: 70px; /* 이미지 높이 */
    border-radius: 50%; /* 원 모양 */
    object-fit: cover; /* 이미지를 잘라서 원에 맞추기 */
    margin-bottom: 5px; /* 이름과의 간격 */
`;

const PlaceholderImage = styled.div`
    width: 70px; /* 원 너비 */
    height: 70px; /* 원 높이 */
    border-radius: 50%; /* 원 모양 */
    background-color: gray; /* 배경색 */
    margin-bottom: 5px; /* 이름과의 간격 */
`;

export default MovieDetailPage;
