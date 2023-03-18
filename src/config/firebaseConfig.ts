import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();

const database = getFirestore(firebaseApp);

export { auth, database, googleProvider, githubProvider, firebaseApp };
