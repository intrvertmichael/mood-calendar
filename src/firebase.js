// FIREBASE
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { ReactReduxFirebaseProvider, ReactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import { ReactReduxFirebaseProvider} from 'react-redux-firebase';
// import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
// import { createFirestoreInstance } from 'redux-firestore';


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


// - - - - - -  - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - -
// const db = firebase.firestore();
// write to firebase
// db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });

// read from firebase
// db.collection("users").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.data().name}: ${doc.data().role}`);
//     });
// });

// - - - - - -  - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - -


firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
