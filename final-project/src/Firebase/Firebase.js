import { initializeApp } from "firebase/app";
import { getFirestore , collection} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDM6uoMzuHNZP5pQ0Pm1Og6FX-Qo8J0aVc",
    authDomain: "filmyverse-94f65.firebaseapp.com",
    projectId: "filmyverse-94f65",
    storageBucket: "filmyverse-94f65.appspot.com",
    messagingSenderId: "72623307095",
    appId: "1:72623307095:web:c9a76ac65cdeee6dd7a612"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef=collection(db,"movies");
export const reviewsRef=collection(db,"reviews");
export const userRef=collection(db,"users");
export default app;