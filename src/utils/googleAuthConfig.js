// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlzD7QGMBJN1tON-Nw5kRMxMjOvDenAZY",
  authDomain: "foodistaauth.firebaseapp.com",
  projectId: "foodistaauth",
  storageBucket: "foodistaauth.appspot.com",
  messagingSenderId: "1091328914330",
  appId: "1:1091328914330:web:4f3566d012a49e027ec023",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();
export { auth, authProvider };
