import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';


// REDUX
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './_reducers';

// FIREBASE
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { ReactReduxFirebaseProvider, ReactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';


// FIREBASE
// react-redux-firebase config

var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "mood-calendar-91494.firebaseapp.com",
  databaseURL: "https://mood-calendar-91494.firebaseio.com",
  projectId: "mood-calendar-91494",
  storageBucket: "mood-calendar-91494.appspot.com",
  messagingSenderId: "1040700958396",
  appId: "1:1040700958396:web:4f2829334b1152a736d2b9"
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}


// REDUX
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


// FIREBASE
const rrfProps = {
  firebase:firebaseConfig,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.data().name}: ${doc.data().role}`);
    });
});

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
