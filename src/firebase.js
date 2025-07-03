import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDif29--Dg3gLqPe2T5WHbxteTnWP3emqQ",
    authDomain: "gestion-taches-b2582.firebaseapp.com",
    projectId: "gestion-taches-b2582",
    storageBucket: "gestion-taches-b2582.firebasestorage.app",
    messagingSenderId: "991752786668",
    appId: "1:991752786668:web:c6129696b7d248a340cbc9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

