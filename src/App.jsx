import './App.css';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';

import NavBar from './components/common/NavBar';
import MovieCard from './components/common/MovieCard';
import MovieDetail from './components/MovieDetail';
import Signup from './components/Signup';
import Login from './components/Login';
import SearchMovie from './components/SearchMovie';
import MovieBanner from './components/MovieBanner';
import UserDetail from './components/UserDetail';
import { useMovies } from './hooks/useMovie';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const { movies } = useMovies();
  const user = useAuth();

  // 미 로그인시 Login page로 이동
  useEffect(() => {
    if (!user && location.pathname === '/') {
      navigate('/login');
    }
  })

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MovieList movies={movies}/>} />
          <Route path='/detail/:id' element={<MovieDetail />} />
          <Route path='/search/detail/:id' element={<MovieDetail />} />
          <Route path='/search' element={<SearchMovie />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user' element={<UserDetail />} />
        </Route>
      </Routes>
      {/* <MovieBanner /> */}
    </>
  );
}

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet></Outlet>
    </>
  );
};

const MovieList = ({ movies }) => (
  <div className='container'>
    <MovieBanner />
    <ul className='card-box'>
      {movies ? (
        movies.map((movie) => (
          <li key={movie.id} onClick={() => navigate(`/detail/${movie.id}`)}>
            <MovieCard movie={movie} />
          </li>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </ul>
  </div>
);
export default App;
