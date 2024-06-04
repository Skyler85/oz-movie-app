import { useState } from 'react';
import './Signup.css';
import NavBar from './NavBar';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState();

  const handleSubmit = () => {};
  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='signup-box'>
        <h2> 🙌 반갑습니다.</h2>
        <h3>회원 가입에 필요한 정보를 기재해 주세요.</h3>
        <p>Nickname <span>*</span></p>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='이름을 입력하세요' required />
        <p>Email <span>*</span></p>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='이메일을 입력하세요' required />
        <p>Password <span>*</span></p>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='비밀번호를 입력하세요' required />
        <p>Password <span>*</span></p>
        <input type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder='비밀번호를 입력하세요' required />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
