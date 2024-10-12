import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import MoviePage from './pages/MoviePage';
import NowPlayingPage from './pages/NowPlayingPage';
import PopularPage from './pages/PopularPage';
import TopRatedPage from './pages/TopRatedPage';
import UpComingPage from './pages/UpComingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movies" element={<MoviePage />} />
            <Route path="movies/now-playing" element={<NowPlayingPage />} />
            <Route path="movies/popular" element={<PopularPage />} />
            <Route path="movies/top-rated" element={<TopRatedPage />} />
            <Route path="movies/up-coming" element={<UpComingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;