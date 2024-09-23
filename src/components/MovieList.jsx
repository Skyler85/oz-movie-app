import React, { useEffect, useState } from 'react'
import MovieBanner from './MovieBanner'
import MovieCard from './common/MovieCard'
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import requests from '../api/requests';

const MovieList = ({movies}) => {
  const navigate = useNavigate();
  const [nowMovies, setNowMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${requests.fetchNowPlaying}`);
      setNowMovies(response.data.results);
    };
    fetchData();
  }, []);

  return (
    <div className='container'>
    <MovieBanner nowMovies={nowMovies} />
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
  )
}

export default MovieList