import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import './NavBar.css';
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className='nav'>
      <Link to='/'>
        <img className='nav__img' src='../../public/logo.jpg' alt='logo' />
      </Link>

      <div className='btn-box'>
        <Link to='/signup'>
          <button>회원가입</button>
        </Link>&nbsp;&nbsp;
        <Link to='/login'>
          <button>로그인</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
