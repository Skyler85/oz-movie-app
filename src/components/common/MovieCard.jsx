import '../../style/MovieCard.css';
import { buildImageUrl } from '../../util/constant';

const MovieCard = ({ movie }) => {
  
  return (
    <>
      <img src={buildImageUrl(movie.backdrop_path)} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>⭐️ {movie.vote_average}</p>
    </>
  );
};

export default MovieCard;
