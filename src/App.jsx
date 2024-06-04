import './App.css';
import MovieCard from './components/MovieCard';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from './api/axios';
import requests from './api/requests';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import MovieDetail from './components/MovieDetail';

function App() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [paramsId, setParamsId] = useState('');

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(requests.fetchPopular, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });
    const results = await response.data.results;
    setMovies(results);
  }, [requests.fetchPopular]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (id) => {
    setParamsId(id);
    navigate('detail/' + paramsId);
  };

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <>
              {/* <MovieBanner /> */}
              <div className='container'>
                <ul>
                  {movies.map((movie) => {
                    return (
                      <>
                        <li onClick={() => handleClick(movie.id)} key={movie.id} className='card-box'>
                          <MovieCard movie={movie} />
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </>
          }
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<MovieDetail />} />
      </Route>
    </Routes>
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
