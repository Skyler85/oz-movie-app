import '../style/Login.css';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log(user)
      navigate('/')
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, email, credential)
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='container'>
      <div className='login-box'>
        <p>
          Email <span>*</span>
        </p>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>
          Password <span>*</span>
        </p>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>로그인</button>
        <button onClick={handleGoogleLogin} style={{backgroundColor:'goldenrod'}}>Google</button>

        <p>
          계정이 없으신가요?
          <Link to='/signup' style={{ color: 'blue' }}>
            {' '}
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
