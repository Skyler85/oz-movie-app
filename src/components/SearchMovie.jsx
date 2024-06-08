import '../style/SearchMovie.css'
import React, { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/debounce';
import axios from '../api/axios';
import { imageBasePath } from '../constant';
import { useNavigate } from 'react-router-dom';
const SearchMovie = () => {
  const navigate = useNavigate()
  const [searchResult, setSearchResult] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(window.location.search); // ?q=ss
  };
  let query = useQuery();
  const searchTerm = query.get('q');
const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(`/search/movie?query=${searchTerm}&include_adult=false`);
      setSearchResult(response.data.results);
      // console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
<>
<h1>{debounceSearchTerm}의 검색 결과</h1>
    <div className='container'>
      <ul className='search-box'>
        {searchResult.length > 0 ? (
          searchResult.map((movie) => (
            <li key={movie.id} onClick={() => navigate(`/search/detail/${movie.id}`)}>
              {movie.backdrop_path || movie.poster_path ? (
                <>
                  <img src={`${imageBasePath}${movie.backdrop_path || movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                  <p>⭐️ {movie.vote_average}</p>
                </>
              ) : null}
            </li>
          ))
        ) : (
          <div>No results found.</div> // 검색 결과가 없을 때 표시
        )}
      </ul>
    </div></>
  );
};

export default SearchMovie;
