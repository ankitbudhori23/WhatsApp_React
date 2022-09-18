import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAdqx2Is36kQWfoX1hfwWwe_2y1gRbPSO8",
    authDomain: "whatsapp-d2807.firebaseapp.com",
    databaseURL: "https://whatsapp-d2807-default-rtdb.firebaseio.com",
    projectId: "whatsapp-d2807",
    storageBucket: "whatsapp-d2807.appspot.com",
    messagingSenderId: "84471409815",
    appId: "1:84471409815:web:6c973fbfcc9a10093a4dd2"
  };

//     Special file
    const firebaseApp = firebase.initializeApp(firebaseConfig);

//     For database Connection
    const db = firebaseApp.firestore();
    const storage = getStorage(firebaseApp);

//  For Authentication 
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    
    export {auth, provider,storage }
    export default db;
