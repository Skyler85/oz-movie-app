// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBLsxJ9mTL0XrUaO004kvvZ3wOaI0KQMxw",
  authDomain: "oz-movie-app.firebaseapp.com",
  projectId: "oz-movie-app",
  storageBucket: "oz-movie-app.appspot.com",
  messagingSenderId: "237545451528",
  appId: "1:237545451528:web:ce269ae12c410d4586e1bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


