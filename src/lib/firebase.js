

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
//import { seedDatabase } from '../seed'; // comment this after seed is done

const config = {
    apiKey: "AIzaSyAmSjzLQYbV0FMAWigABp8eGFD0UVfHYKE",
    authDomain: "univent-7f916.firebaseapp.com",
    projectId: "univent-7f916",
    storageBucket: "univent-7f916.appspot.com",
    messagingSenderId: "771252645567",
    appId: "1:771252645567:web:7be61e18540cdc2900a00a",
    measurementId: "G-WKMZT15ZHB"
}; // your config goes here
  
firebase.initializeApp(config);
const db = firebase.firestore();

//seedDatabase(fb); // comment this after seed is done

export { db }; 