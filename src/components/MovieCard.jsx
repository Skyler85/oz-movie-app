import React from 'react';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault();

    navigate('/detail')

  }
    console.log(movie);
    return (
        
            <li key={movie.id} onClick={handleClick} className='card-box'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>⭐️ {movie.vote_average}</p>
            </li>

    );
};

export default MovieCard;
