import { useNavigate } from 'react-router-dom';
import movieData from '../data/movieListData.json';
import './MovieBanner.css'

const MovieBanner = () => {
    const movies = movieData.results;
    const navigate = useNavigate()
    const handleClick = (e) => {
        navigate('/detail')
    }
    const movePrev = (e) => {
        e.preventDefault()
        
    }
    const moveNext = (e) => {
        e.preventDefault()
    }

    return (
        <div className='slider'>
            {movies.map((movie) => {
                return (
                    <div key={movie.id} onClick={handleClick} className='slide'>
                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </div>
                );
            })}
            <button className='left-btn'>〈</button>
            <button className='right-btn'>〉</button>
        </div>
    );
};

export default MovieBanner;
