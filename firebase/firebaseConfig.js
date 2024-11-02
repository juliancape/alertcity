// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1YGQkiOrMUgeZwlLfkoJnWPYdktyOneA",
  authDomain: "alertcity-ab518.firebaseapp.com",
  projectId: "alertcity-ab518",
  storageBucket: "alertcity-ab518.firebasestorage.app",
  messagingSenderId: "1087292677503",
  appId: "1:1087292677503:web:e7106f7fcfc4dc2340ce4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };