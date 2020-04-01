import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';


// REDUX
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './_reducers';

// FIREBASE
import thunk from 'redux-thunk';
import fb from './firebase';
import firebase from 'firebase/app'
import 'firebase/firestore';
// import {ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase';
// import {reduxFirestore, createFirestoreInstance} from 'redux-firestore';

import {reduxFirestore, getFirestore, createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase';

// REDUX
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;

// STORE
// const store = createStore(reducer, composeEnhancers(
//   // ReactReduxFirebase(firebase, rrfConfig),
//   applyMiddleware(thunk.withExtraArgument({getFirebase}))
// ));

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

// Add reduxFirestore store enhancer to store creator
// const createStoreWithFirebase = compose(
//   reduxFirestore(firebase, rrfConfig), // firebase instance as first argument, rfConfig as optional second
// )(createStore);

// Create store with reducers and initial state
const store = createStore(reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fb)
  )
);

// FIREBASE

const rrfProps = {
  firebase,
  config: fb,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
