// FIREBASE
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// FIREBASE
var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "mood-calendar-91494.firebaseapp.com",
  databaseURL: "https://mood-calendar-91494.firebaseio.com",
  projectId: "mood-calendar-91494",
  storageBucket: "mood-calendar-91494.appspot.com",
  messagingSenderId: "1040700958396",
  appId: "1:1040700958396:web:4f2829334b1152a736d2b9"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
