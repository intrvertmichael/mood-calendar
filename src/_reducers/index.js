import { combineReducers } from 'redux';

import calendarReducer from './calendarReducer';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  calendar: calendarReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
