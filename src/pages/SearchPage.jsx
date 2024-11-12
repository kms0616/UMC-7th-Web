import React, { useState, useEffect } from 'react';
import * as S from "../style/search_style";
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import MovieCard from '../components/MovieCard';  // MovieCard 임포트

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);  // 검색 상태를 추적하는 상태 추가
    const navigate = useNavigate();
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    });
    const mq = searchParams.get('mq');

    const handleSearchMovie = () => {
        if (!searchValue) return;  // 검색어가 비어있으면 실행하지 않음
        if (mq === searchValue) return;  // 이미 같은 검색어라면 리렌더링을 막기 위해 return
        setSearching(true);  // 검색 시작
        navigate(`/search?mq=${searchValue}`);  // URL 업데이트
    };

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();  // 엔터키 입력 시 검색 실행
        }
    };

    const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoading, isError } = useCustomFetch(url);

    const Skeleton = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '20px', marginTop: '20px' }}>
            {[...Array(20)].map((_, idx) => (
                <div key={idx} style={{
                    height: '250px', backgroundColor: '#888', borderRadius: '10px', animation: 'pulse 1.5s infinite ease-in-out'
                }} />
            ))}
        </div>
    );
    // 로딩, 오류, 검색 결과가 없을 때 처리
    const renderContent = () => {
        if (isLoading && searching) return <Skeleton/>;
        if (isError && searching) return <div>영화를 불러오는 데 오류가 발생했습니다.</div>;
        if (!searching) return null;  // 검색이 진행 중이지 않으면 아무것도 렌더링하지 않음
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
            <S.MovieGridContainer>
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        release_date={movie.release_date}
                        onClick={() => navigate(`/movies/${movie.id}`)}  // 상세 페이지로 이동
                    />
                ))}
            </S.MovieGridContainer>
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
