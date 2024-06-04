import './MovieDetail.css';
import movieDetailData from '../data/movieDetailData.json';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

const MovieDetail = () => {
  const navigate = useNavigate();
  const movieId = useParams().id; // 객체로 받아옴 -> id의 값 가져옴
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태


  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    }
    fetchData();
  }, [movieId]);
  
  if (!movie) return <div>데이터를 불러오는 중입니다.</div>; // 로딩중인 경우 표시

  const handleGoBack = (e) => {
    navigate(-1);
  };

  return (
    <div className='detail-container'>
      <div className='img-box'>
        <img className='detail__img' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className='detail__info'>
        <div className='detail__head'>
          <h2>{movie.title}</h2>
          <p>⭐️ {movie.vote_average}</p>
        </div>
        <div className='detail__genre'>
          {movie.genres.map((genre) => {
            return <button className='genre-btn'>{genre.name}</button>;
          })}
        </div>
        <div className='detail__overview'>{movie.overview}</div>
        <div className='home-link'>
          <button onClick={handleGoBack}>〈</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
