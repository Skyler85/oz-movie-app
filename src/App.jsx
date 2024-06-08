import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import axios from './api/axios';
import requests from './api/requests';

import NavBar from './components/common/NavBar';
import MovieCard from './components/common/MovieCard';
import MovieDetail from './components/MovieDetail';
import Signup from './components/Signup';
import Login from './components/Login';
import SearchMovie from './components/SearchMovie';
import MovieBanner from './components/MovieBanner';
import UserDetail from './components/UserDetail';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // 미 로그인시 Login page로 이동
  useEffect(() => {

    if(location.pathname === '/' && !user) {
      navigate('/login');
    }
    
  }, [user, navigate]);

  console.log(location.pathname)

  // 사용자 로그인 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchPopular);
      const movieData = response.data.results;
      console.log('Loaded from the movie information server.');
      setMovies(movieData);
    }
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <div className='container'>
                <MovieBanner />
                <ul className='card-box'>
                  {movies ? (
                    movies.map((movie) => {
                      return (
                        <li key={movie.id} onClick={() => navigate(`/detail/${movie.id}`)}>
                          <MovieCard movie={movie} />
                        </li>
                      );
                    })
                  ) : (
                    <div>Loading...</div> // 로딩 중일 때 표시할 내용
                  )}
                </ul>
              </div>
            }
          />
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
export default App;
