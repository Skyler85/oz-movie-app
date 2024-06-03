import { useState } from 'react';
import './App.css';
import movieData from './data/movieListData.json';
import MovieCard from './components/MovieCard';

function App() {
    const movies = movieData.results;

    return (
        <div className='container'>
            {movies.map((movie) => {
                return (
                  <ul>
                    <MovieCard movie={movie}/>
                    </ul>
                )
            })}
        </div>
    );
}

export default App;
