import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCGulsm6hwsEb_a3btswA0Hn_BLZmeJykg",
  authDomain: "restlebnb-hotel-app.firebaseapp.com",
  projectId: "restlebnb-hotel-app",
  storageBucket: "restlebnb-hotel-app.appspot.com",
  messagingSenderId: "507195533055",
  appId: "1:507195533055:web:f4ba5294358025bfe04eca",
  measurementId: "G-KGYH5W62YL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  
  export { firebase };
