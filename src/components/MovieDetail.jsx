import '../style/MovieDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useMovies } from '../hooks/useMovie';

const MovieDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { movieDetail, fetchMovieDetail } = useMovies();

  useEffect(() => {
    fetchMovieDetail(id);
  }, [id]);

  if (!movieDetail) return <div>데이터를 불러오는 중입니다.</div>;

  const handleGoBack = () => {
    navigate(-1);
  };
  const genres = () => {
    movieDetail.genres.map((genre) => (
      <button key={genre.name} className='genre-btn'>
        {genre.name}
      </button>
    ));
  };

  return (
    <div className='detail-container'>
      <div className='img-box'>
        <img className='detail__img' src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`} alt={movieDetail.title} />
      </div>
      <div className='detail__info'>
        <div className='detail__head'>
          <h2>{movieDetail.title}</h2>
          <p>⭐️ {movieDetail.vote_average}</p>
        </div>
        <div className='detail__genre'>{genres}</div>
        <div className='detail__overview'>{movieDetail.overview}</div>
        <div className='back-btn'>
          <button onClick={handleGoBack}>〈</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
