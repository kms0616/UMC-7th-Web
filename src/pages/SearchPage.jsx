import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import * as S from "../style/search_style";
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import MovieCard from '../components/MovieCard'; // MovieCard 임포트

const Skeleton = () => (
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

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false); // 검색 상태를 추적하는 상태 추가
    const navigate = useNavigate();

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    });
    const mq = searchParams.get('mq');

    const handleSearchMovie = useCallback(
        debounce(() => {
            if (!searchValue) return;
            if (mq === searchValue) return;
            setSearching(true); // 검색 시작
            navigate(`/search?mq=${searchValue}`); // URL 업데이트
        }, 500), // 500ms의 딜레이 후 검색
        [searchValue, mq, navigate] // 의존성 배열
    );

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
        }
    };

    const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoading, isError } = useCustomFetch(url);

    const renderContent = () => {
        if (isLoading && searching) return <Skeleton />;
        if (isError && searching) return <div>영화를 불러오는 데 오류가 발생했습니다.</div>;
        if (!searching) return null; // 검색이 진행 중이지 않으면 아무것도 렌더링하지 않음
        if (!Array.isArray(movies) || movies.length === 0) {
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
                {movies.map(movie => (
                    <S.MovieListItem
                        key={movie.id}
                        onClick={() => navigate(`/movies/${movie.id}`)} // 부모 컨테이너에 클릭 이벤트 추가
                    >
                        {/* 포스터 */}
                        <S.MoviePoster>
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                poster_path={movie.poster_path}
                                release_date={movie.release_date}
                            />
                        </S.MoviePoster>
                        
                        {/* 제목과 개봉일 */}
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
                <button onClick={handleSearchMovie}>
                    검색
                </button>
            </S.SearchContainer>

            <div style={{ marginTop: '20px' }}>
                {renderContent()}
            </div>
        </>
    );
};

export default SearchPage;
