import './App.css';
import movieData from './data/movieListData.json';
import MovieCard from './components/MovieCard';
import MovieBanner from './components/MovieBanner';

function App() {
    const movies = movieData.results;

    return (
        <>
        <MovieBanner />
        <div className='container'>
            {movies.map((movie) => {
                return (
                    <>
                        <ul>
                            <MovieCard movie={movie} />
                        </ul>
                    </>
                );
            })}
        </div>
        </>
    );
}

export default App;
