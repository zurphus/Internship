// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAofA9HJ_tfpP5Mk_ZOMai2ZfeDkfOq5uE",
  authDomain: "hollywood-ai-6bb5b.firebaseapp.com",
  projectId: "hollywood-ai-6bb5b",
  storageBucket: "hollywood-ai-6bb5b.firebasestorage.app",
  messagingSenderId: "141998315187",
  appId: "1:141998315187:web:12dd576ca48a504a8542c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
