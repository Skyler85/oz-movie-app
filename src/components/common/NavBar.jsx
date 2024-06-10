import '../../style/NavBar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../api/authContext';
import { logout, subscribeToAuthChanges } from '../../auth/autoManager';

const NavBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const context = useContext(AuthContext);

  const location = useLocation();
  useEffect(() => {
    // 현재 경로가 '/search'가 아니면 searchText를 빈 문자열로 설정
    if (!location.pathname.startsWith('/search')) {
      setSearchText('');
    }
  }, [location]); // location 객체가 변경될 때마다 이 useEffect가 실행됩니다.

  // 사용자 로그인 확인
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert('Logout failed: ', error);
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className='nav'>
      <Link to='/'>
        <img className='nav__img' src='/logo.jpg' alt='logo' />
      </Link>
      {user ? (
        <div>
          <input
            type='text'
            className='searchInput'
            value={searchText}
            onChange={handleChange}
            placeholder='Please enter your search term'
          />
        </div>
      ) : null}

      <div className='btn-box'>
        {user ? (
          <>
            <div className='user-avatar'>
              <span>반갑습니다, {user.displayName || '___'}님</span>
              <img src={user.photoURL || '/defaultUserAvatar.png'} alt='avatar' />
              <div className='user-select'>
                <p>
                  <Link to='/user'>마이페이지</Link>
                </p>
                <p>
                  <Link to='/login' onClick={handleLogout}>
                    로그아웃
                  </Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <Link to='/login'>
            <button>로그인</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
