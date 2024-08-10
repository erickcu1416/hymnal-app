import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDhBqc-5CHkihUqi_mUWuSxG-yaxSk-amg",
    authDomain: "hymnal-app-backend.firebaseapp.com",
    projectId: "hymnal-app-backend",
    storageBucket: "hymnal-app-backend.appspot.com",
    messagingSenderId: "8819184563",
    appId: "1:8819184563:web:4216313c62e032574131c6"
};

const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { auth, getAuth}