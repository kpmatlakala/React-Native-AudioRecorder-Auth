// /firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGulsm6hwsEb_a3btswA0Hn_BLZmeJykg",
    authDomain: "restlebnb-hotel-app.firebaseapp.com",
    projectId: "restlebnb-hotel-app",
    storageBucket: "restlebnb-hotel-app.appspot.com",
    messagingSenderId: "507195533055",
    appId: "1:507195533055:web:f4ba5294358025bfe04eca",
    measurementId: "G-KGYH5W62YL",
};

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
