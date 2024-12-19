import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import * as S from "../style/search_style";
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import MovieCard from '../components/MovieCard'; // MovieCard 임포트

// Skeleton 컴포넌트의 타입 정의
const Skeleton: React.FC = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '20px', marginTop: '20px' }}>
        {[...Array(20)].map((_, idx) => (
            <div
                key={idx}
                style={{
                    height: '250px',
                    backgroundColor: '#888',
                    borderRadius: '10px',
                    animation: 'pulse 1.5s infinite ease-in-out',
                }}
            />
        ))}
    </div>
);

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const navigate = useNavigate();

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
  };

  const [searchParams] = useSearchParams();
  const mq = searchParams.get('mq');

  const handleSearchMovie = useCallback(
      debounce(() => {
          if (!searchValue) return;
          if (mq === searchValue) return;
          setSearching(true);
          navigate(`/search?mq=${searchValue}`);
      }, 500),
      [searchValue, mq, navigate]
  );

  const handleSearchMovieWithKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          handleSearchMovie();
      }
  };

  const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
  const { data, isLoading, isError } = useCustomFetch(url); // data 타입은 Movie[]으로 유추됨

  const renderContent = () => {
      if (isLoading && searching) return <Skeleton />;
      if (isError && searching) return <div>영화를 불러오는 데 오류가 발생했습니다.</div>;
      if (!searching) return null;
      if (data.length === 0) {
          return (
              <div style={{
                  color: 'white',
                  textAlign: 'center',
                  marginTop: '20px',
                  fontSize: '18px'
              }}>
                  검색하신 '{searchValue}' 영화에 해당하는 데이터가 없습니다.
              </div>
          );
      }

      return (
          <S.MovieListContainer>
              {data.map((movie) => (
                  <S.MovieListItem
                      key={movie.id}
                      onClick={() => navigate(`/movies/${movie.id}`)}
                  >
                      <S.MoviePoster>
                          <MovieCard
                              id={movie.id}
                              title={movie.title}
                              poster_path={movie.poster_path}
                              release_date={movie.release_date}
                              onClick={() => navigate(`/movies/${movie.id}`)}  // onClick 추가
                          />
                      </S.MoviePoster>

                      <S.MovieDetails>
                          <h3>{movie.title}</h3>
                          <p>{movie.release_date}</p>
                      </S.MovieDetails>
                  </S.MovieListItem>
              ))}
          </S.MovieListContainer>
      );
  };

  return (
      <>
          <S.SearchContainer>
              <input
                  placeholder='영화 제목을 입력해주세요 ...'
                  value={searchValue}
                  onChange={onChangeSearchValue}
                  onKeyDown={handleSearchMovieWithKeyboard}
              />
              <button onClick={handleSearchMovie}>검색</button>
          </S.SearchContainer>

          <div style={{ marginTop: '20px' }}>
              {renderContent()}
          </div>
      </>
  );
};

export default SearchPage;
