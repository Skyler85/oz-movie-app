import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import axios from './api/axios';
import requests from './api/requests';

import NavBar from './components/NavBar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchPopular, {
        method: 'GET',
        // params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        }

      });
      const movieData = response.data.results
      console.log(movieData)
      setMovies(movieData);
    }
    fetchData();
  },[]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <div className='container'>
                <ul className='card-box'>
                {movies ? (
                    movies.map((movie) => {
                      return (
                        <li key={movie.id} onClick={() => navigate(`/detail/${movie.id}`)} >
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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
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
