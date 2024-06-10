// src/auth/authManager.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../../firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

const subscribeToAuthChanges = (handleUserChange) => {
  const unsubscribe = onAuthStateChanged(auth, user => {
    handleUserChange(user);
  });
  return unsubscribe;
};

const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};
export { signInWithEmail, signInWithGoogle, subscribeToAuthChanges, logout };