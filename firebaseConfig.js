import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
    apiKey: "AIzaSyDhBqc-5CHkihUqi_mUWuSxG-yaxSk-amg",
    authDomain: "hymnal-app-backend.firebaseapp.com",
    projectId: "hymnal-app-backend",
    storageBucket: "hymnal-app-backend.appspot.com",
    messagingSenderId: "8819184563",
    appId: "1:8819184563:web:4216313c62e032574131c6"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);