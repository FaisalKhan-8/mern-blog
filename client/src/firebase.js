// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-beatblog.firebaseapp.com',
  projectId: 'mern-beatblog',
  storageBucket: 'mern-beatblog.appspot.com',
  messagingSenderId: '278714426749',
  appId: '1:278714426749:web:5dc539427a19a267395814',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
