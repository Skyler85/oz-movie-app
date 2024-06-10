import '../style/Signup.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePasswords(password, passwordConfirm)) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Created your Account.');
      await updateUserProfile(name, avatar);
      console.log('User Registered successfully: ', user);
      navigate('/');
    } catch (error) {
      displayErrorMessage(error.code);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('이메일 형식이 올바르지 않습니다');
      return false;
    }
    return true;
  };

  const validatePasswords = (password, passwordConfirm) => {
    const errorMessageElement = document.getElementById('error-message');
    if (password !== passwordConfirm) {
      errorMessageElement.textContent = 'Passwords do not match!';
      return false;
    } else {
      errorMessageElement.textContent = '';
      return true;
    }
  };

  const updateUserProfile = async (name, avatar) => {
    try {
      const updateData = { displayName: name };
      if (avatar) {
        updateData.photoURL = avatar;
      }
      await updateProfile(auth.currentUser, updateData);
      console.log('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const displayErrorMessage = (errorCode) => {
    let userFriendlyMessage;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        userFriendlyMessage = '이미 사용 중인 이메일 주소입니다.';
        break;
      case 'auth/invalid-email':
        userFriendlyMessage = '유효하지 않은 이메일 주소입니다.';
        break;
      case 'auth/weak-password':
        userFriendlyMessage = '비밀번호가 너무 약합니다. 6자 이상 입력해주세요.';
        break;
      default:
        userFriendlyMessage = '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';
    }
    alert(userFriendlyMessage);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSignUp} className='signup-box'>
        <h2> 🙌 반갑습니다.</h2>
        <h3>회원 가입에 필요한 정보를 기재해 주세요.</h3>
        <p>
          Nickname <span>*</span>
        </p>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='이름을 입력하세요' required />
        <p>
          Email <span>*</span>
        </p>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='이메일을 입력하세요' required />
        <p>
          Password <span>*</span>
        </p>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호를 입력하세요'
          required
          minLength={6}
        />
        <p>
          Password <span>*</span> <span id='error-message'></span>
        </p>
        <input
          type='password'
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder='비밀번호를 입력하세요'
          required
          minLength={6}
        />
        <p>Avatar</p>
        <input
          type='file'
          onChange={(e) => setAvatar(e.target.files[0])}
          accept='image/*'
          size={5000000} // byte <-> 5MB
          placeholder='이미지를 등록하세요'
        />
        <button type='submit'>Sign Up</button>
        <p>
          이미 회원이신가요?
          <Link to='/login' style={{ color: 'blue' }}>
            {' '}
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
