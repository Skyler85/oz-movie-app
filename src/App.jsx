import './App.css';
import movieData from './data/movieListData.json';
import MovieCard from './components/MovieCard';
import { useNavigate } from 'react-router-dom';

function App() {
    const movies = movieData.results;


    return (
        <div className='container'>
            {movies.map((movie) => {
                return (
                    <ul>
                        <MovieCard movie={movie} />
                    </ul>
                );
            })}
        </div>
    );
}

export default App;
