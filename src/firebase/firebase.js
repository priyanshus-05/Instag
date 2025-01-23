
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsZWkne6G4OwyqHauztsv_QVSTc7jRTtA",
  authDomain: "project-network-3fed5.firebaseapp.com",
  projectId: "project-network-3fed5",
  storageBucket: "project-network-3fed5.firebasestorage.app",
  messagingSenderId: "195816024360",
  appId: "1:195816024360:web:49f2dedb9afa2c4dd0881d",
  measurementId: "G-3W821D3TMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app,auth, firestore, storage};
