import './App.css';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';

import NavBar from './components/common/NavBar';
import MovieDetail from './components/MovieDetail';
import Signup from './components/Signup';
import Login from './components/Login';
import SearchMovie from './components/SearchMovie';
import UserDetail from './components/UserDetail';
import { useMovies } from './hooks/useMovie';
import MovieList from './components/MovieList';

function App() {
  const { movies } = useMovies();

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MovieList movies={movies}/>} />
          <Route path='/detail/:id' element={<MovieDetail />} />
          <Route path='/search/detail/:id' element={<MovieDetail />} />
          <Route path='/search' element={<SearchMovie />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user' element={<UserDetail />} />
        </Route>
      </Routes>
    </>
  );
}

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet></Outlet>
    </>
  );
};

export default App;
