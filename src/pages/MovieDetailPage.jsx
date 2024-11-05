import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../apis/axios-instance';
import styled from 'styled-components';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const movieResponse = await axiosInstance.get(`/movie/${movieId}`);
                setMovie(movieResponse.data);

                const creditsResponse = await axiosInstance.get(`/movie/${movieId}/credits`);
                setCredits(creditsResponse.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieData();
    }, [movieId]);

    if (!movie || !credits) return <div>Loading...</div>;

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
    background-image: url(${(props) => `https://image.tmdb.org/t/p/w500${props.backdrop}`});
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
