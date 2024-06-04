import { useNavigate } from 'react-router-dom';
import movieData from '../data/movieListData.json';
import './MovieBanner.css'

const MovieBanner = () => {
    const movies = movieData.results
    const movieDataArray = () => {
        movies.map((movie) => {
            title: movie.title;
            id: movie.id;
            poster_path: movie.poster_path;
            backdrop_path: movie.backdrop_path;
            vote_average: movie.vote_average;
            overview: movie.overview;
        },[])
    }
    console.log(movies)
    console.log(movieDataArray())

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
        <div className='slider-inner'></div>
            {movies.map((movie) => {
                return (
                    <div key={movie.id} onClick={handleClick} className='slide'>
                        <img id='slider-image' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
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