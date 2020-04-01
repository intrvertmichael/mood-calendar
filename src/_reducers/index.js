import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import calendarReducer from './calendarReducer';

export default combineReducers({
  calendar: calendarReducer,
  firestore: firestoreReducer
});
