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
  //'../../public/defaultUserAvatar.png'
  const navigate = useNavigate()

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessageElement = document.getElementById('error-message');
    console.log(auth);

    if (password !== passwordConfirm) {
      errorMessageElement.textContent = 'Passwords do not match!';
      return;
    } else {
      errorMessageElement.textContent = '';
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Created you're Account.");

        if (avatar !== '') {
          // insert displayName Update code
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: avatar,
          })
            .then(() => {
              // Profile updated!
              console.log('Updated you are profiles.');
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        }
        // insert displayName Update code
        updateProfile(auth.currentUser, {
          
          displayName: name
        }).then(() => {
          // Profile updated!
          console.log("Updated you are profiles.")
        }).catch((error) => {
          // An error occurred
          // ...
        });

        console.log('User Registered successfully: ', user);
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        displayErrorMessage(errorCode);
      });
  };

  const displayErrorMessage = (errorCode) => {
    // errorCode에 따라 사용자에게 보여줄 메시지 정의
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
    // 사용자에게 메시지를 보여주는 로직 (예: alert 또는 UI 업데이트)
    alert(userFriendlyMessage);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='signup-box'>
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
          onChange={(e) => setAvatar(...avatar, e.target.files[0])}
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
