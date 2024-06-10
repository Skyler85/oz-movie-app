import '../style/Login.css';
import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle } from '../auth/autoManager';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('이메일 형식이 올바르지 않습니다');
      return;
    }
    if (password.length < 6) {
      alert('패스워드의 길이가 6자 이상이어야 합니다.');
      return;
    }

    try {
      await signInWithEmail(email, password);
      navigate('/');
    } catch (error) {
      console.error(error.code);
      alert("아이디와 비밀번호를 확인해주세요");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      alert(errorCode);
    }
  };

  return (
    <form onSubmit={handleLogin} className='container'>
      <div className='login-box'>
        <p>Email <span>*</span></p>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>Password <span>*</span></p>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>로그인</button>
        <button onClick={handleGoogleLogin} style={{ backgroundColor: 'goldenrod' }}>Google</button>
        <p>계정이 없으신가요?
          <Link to='/signup' style={{ color: 'blue' }}> 회원가입</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
