import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import calendarReducer from './calendarReducer';

// Add firebase to reducers
const reducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  calendar: calendarReducer
})

export default reducer;
