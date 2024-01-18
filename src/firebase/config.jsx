
import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClOeZItHM18cbdRmrGdoKj7zauH4PkGGk",
    authDomain: "fir-b7963.firebaseapp.com",
    projectId: "fir-b7963",
    storageBucket: "fir-b7963.appspot.com",
    messagingSenderId: "458457720382",
    appId: "1:458457720382:web:5cdd70d5df40f80c06536f",
    measurementId: "G-97GH1YZ6LL"
  };

const firebaseApp=initializeApp(firebaseConfig);

const auth= getAuth(firebaseApp)
const firestore=getFirestore(firebaseApp)
const storage=getStorage(firebaseApp)

export {auth,firestore,storage}