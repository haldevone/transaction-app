import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, updateProfile, 
  signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
  



const firebaseConfig = {
    apiKey: process.env.REACT_APP_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  console.log(process.env)
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();

  function authSignup(email : any, password : any){
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function authSignIn(email : any, password : any){
    return signInWithEmailAndPassword(auth, email, password);
  }

  export {db, authSignup, auth, updateProfile, 
    authSignIn, onAuthStateChanged}