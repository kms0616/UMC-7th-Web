import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import fetchRandomMovie from '../utils/fetchMovie';  // 영화 데이터 가져오기 함수

// 페이지 전체를 감싸는 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #c02b5c;
`;

// 윗부분은 분홍색 배경
const TopSection = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: flex-start;
  align-items: left;
  flex-direction: column;
  padding-left: 50px;
  padding-top: 50px;
  h6 {
    margin-bottom: 5px;
  }

  h1 {
    margin-top: 20px;
  }
`;

// 버튼들을 담을 불투명한 검은색 배경을 가진 컨테이너
const ButtonsContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);  // 불투명한 검은색 배경
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;

// 재생하기 버튼 스타일
const PlayButton = styled(Button)`
  background-color: #ff0558;  // 배경색
  color: white;               // 글씨 색
  margin-left: 70px;          // 왼쪽으로 조금 이동
`;

// 공유하기 버튼 스타일
const ShareButton = styled(Button)`
  background-color: transparent;  // 투명 배경
  color: white;                   // 글씨 색
  border: 1px solid white;        // 흰색 테두리
`;

// 아래 부분 영화 정보가 나오는 섹션
const BottomSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: black;
  padding: 20px;
`;

// 영화 포스터 스타일
const MoviePoster = styled.img`
  width: 150px;
  height: 225px;
  object-fit: cover;
  margin-right: 20px;
`;

// 영화 정보 컨테이너
const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  border: 1px solid #555;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 100px;
  padding: 10px;
`;

// 제목 스타일
const MovieTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

// 줄거리 스타일
const MovieOverview = styled.p`
  font-size: 13px;
  font-weight: normal;
  max-width: 500px;
  text-align: left;
  color: #999;
`;

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
}

const PartyPage: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovie = async () => {
      const fetchedMovie = await fetchRandomMovie();
      if (fetchedMovie) {
        console.log(fetchedMovie); // 영화 데이터를 콘솔에 출력
        setMovie(fetchedMovie);
      } else {
        console.error('영화 데이터를 불러오는 데 실패했습니다.');
      }
    };
    getMovie();
  }, []);

  if (!movie) {
    return <div>영화 정보를 불러오는 중...</div>;
  }

  return (
    <PageContainer>
      <TopSection>
        <div>
          <h6 style={{ color: 'white' }}>민챠파티</h6>
          <h1 style={{ color: 'white' }}>민파 달리자 ! 🏃🏻‍♀️</h1>
        </div>
      </TopSection>

      <ButtonsContainer>
        <PlayButton>재생하기</PlayButton>
        <ShareButton>공유하기</ShareButton>
      </ButtonsContainer>

      <BottomSection>
        <MovieInfo>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieOverview>{movie.overview}</MovieOverview>
          </div>
        </MovieInfo>
      </BottomSection>
    </PageContainer>
  );
};

export default PartyPage;
