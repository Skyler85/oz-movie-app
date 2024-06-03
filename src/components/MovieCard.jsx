import React from 'react'
import './MovieCard.css'

const MovieCard = ({movie}) => {
  console.log(movie)
  return (
    <li className='card-box'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} /> 
      <h3>{movie.title}</h3>
      <p>⭐️ {movie.vote_average}</p>
    </li>
  )
}

export default MovieCard