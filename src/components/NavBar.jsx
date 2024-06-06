import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const location = useLocation();
  console.log(location);
  useEffect(() => {
    // 현재 경로가 '/search'가 아니면 searchText를 빈 문자열로 설정
    if (!location.pathname.startsWith('/search')) {
      setSearchText('');
    }
  }, [location]); // location 객체가 변경될 때마다 이 useEffect가 실행됩니다.

  const handleChange = (e) => {
    setSearchText(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className='nav'>
      <Link to='/'>
        <img className='nav__img' src='../../public/logo.jpg' alt='logo' />
      </Link>
      <div>
        <input type='text' className='searchInput' value={searchText} onChange={handleChange} placeholder='Please enter your search term' />
      </div>

      <div className='btn-box'>
        <Link to='/signup'>
          <button>회원가입</button>
        </Link>
        &nbsp;&nbsp;
        <Link to='/login'>
          <button>로그인</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
