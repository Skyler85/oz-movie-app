import '../style/UserDetail.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // 사용자 로그인 확인
  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  // console.log(user)

  if (!user) {
    return <div>Loading user details...</div>; // 로딩 상태 표시
  }

  return (
    <div className='user-container'>
      <h1>회원정보</h1>
      <div className='user-info__box'>
        <p className='user-info__photo'>
          <img src={user.photoURL || '/defaultUserAvatar.png'} />
          <strong>아바타</strong>
        </p>
        <hr />
        <p className='user-info__text'>
          <strong>닉네임</strong>
          <span>{user.displayName}</span>
        </p>
        <p className='user-info__text'>
          <strong>이메일</strong>
          <span>{user.email}</span>
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
