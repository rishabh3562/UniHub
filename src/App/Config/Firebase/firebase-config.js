// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librarie
// Your web app's Firebase configuration

// dotenv.config("../../../.env.local");
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_FIREBAE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBAE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBAE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBAE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBAE_APPID,
  measurementId: process.env.REACT_APP_FIREBAE_MEASUREMENTID,
};

console.log("firebaseConfig", firebaseConfig);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("app in the firebaseConfig", app);
console.log("auth in the firebaseConfig", auth);
console.log("db in the firebaseConfig", db);
console.log("storage in the firebaseConfig", storage);