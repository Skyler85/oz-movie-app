import '../../style/MovieCard.css';
import { imageBasePath } from '../../constant';

const MovieCard = ({ movie }) => {
  // console.log(movie);
  return (
    <>
      <img src={`${imageBasePath}${movie.backdrop_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>⭐️ {movie.vote_average}</p>
    </>
  );
};

export default MovieCard;
