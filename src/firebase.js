import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmezPBtm5P9zeE5wSWeMIiEOINnLR6fT8",
  authDomain: "audio-books-55e6a.firebaseapp.com",
  projectId: "audio-books-55e6a",
  storageBucket: "audio-books-55e6a.appspot.com",
  messagingSenderId: "395097088952",
  appId: "1:395097088952:web:7c71448d9d833e9e59254d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const usersCollection = collection(db, "users");

export { auth, db, usersCollection }