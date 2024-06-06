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
import SearchMovie from './components/SearchMovie';
import MovieBanner from './components/MovieBanner';

function App() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchPopular);
      const movieData = response.data.results
      console.log("Loaded from the movie information server.")
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
                <MovieBanner />
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
          <Route path='/search' element={<SearchMovie />} />
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
