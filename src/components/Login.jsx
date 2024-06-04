import { useState } from 'react';
import NavBar from './NavBar';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='container'>

    <div className='login-box'>
      <p>Email <span>*</span></p>
      <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>Password <span>*</span></p>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>로그인</button>
    </div>
    </div>
  );
};

export default Login;
