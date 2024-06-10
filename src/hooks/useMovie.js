import { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';

export const useMovies = () => {
  const [movies, setMovies] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(requests.fetchPopular);
      setMovies(response.data.results);
    };
    fetchData();
    console.log('Loaded from the movie information server.');
  }, []);

  const fetchMovieDetail = async (id) => {
    const response = await axios.get(`/movie/${id}`);
    setMovieDetail(response.data);
  };

  return { movies, movieDetail, fetchMovieDetail };
};