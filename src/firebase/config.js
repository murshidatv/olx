// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQkNoYm670WzsAAID6x_CLGAYRhl9Pmiw",
  authDomain: "olx-new-c3836.firebaseapp.com",
  projectId: "olx-new-c3836",
  storageBucket: "olx-new-c3836.appspot.com",
  messagingSenderId: "742636872857",
  appId: "1:742636872857:web:a2b18ae908b5c45422c408",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage(app);

export { app, db, auth, storage };