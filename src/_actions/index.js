import _ from 'lodash';

// LOCAL ACTIONS
export const setCurrentMonth = (month) => {
  return { type: 'SET_CURRENT_MONTH', month: month} ;
}
export const setCurrentDay = (day) => {
  return { type: 'SET_CURRENT_DAY', day: day};
}



export const addMonth = (monthName, month) => {
  return { type: 'ADD_MONTH', monthName:monthName, month:month } ;
}
export const addDay = (dayName, day) => {
  return(dispatch, getState) => {
    const currentMonth = getState().current.month;
    dispatch({type: 'ADD_DAY', dayName: dayName, day: day, month:currentMonth});
  }
}



export const clearDay = () => {
  return (dispatch, getState) => {
    const currentMonth = getState().current.month;
    const currentDay = getState().current.day;

    dispatch({ type: 'CLEAR_DAY', month:currentMonth, day:currentDay});
    const allDays = getState().calendar.year2020;
    dispatch({ type: 'SET_CURRENT_AVG', days:allDays[`month${currentMonth}`].days});
  }
}
export const setMood = (mood) => {
  return (dispatch, getState) => {
    const currentMonth = getState().current.month;
    const currentDay = getState().current.day;

    dispatch({ type: 'SET_MOOD', month:currentMonth, day:currentDay, mood:mood });
    const allDays = getState().calendar.year2020;
    dispatch({ type: 'SET_CURRENT_AVG', days:allDays[`month${currentMonth}`].days});
  }
}
export const setMessage = (message) => {
  return (dispatch, getState) => {
    const currentMonth = getState().current.month;
    const currentDay = getState().current.day;
    dispatch({ type: 'SET_MESSAGE', month:currentMonth, day:currentDay, message:message });
  }
}




// FIREBASE ACTIONS

// when app first starts.
export const syncReduxFirestore = (firestoreCalendars) => {
  console.log('inside sync');
  const fireObj = firestoreCalendars.year2020;
  return (dispatch, getState) => {
    const localObj = getState().calendar.year2020;
    const equal = _.isEqual(localObj, fireObj);
    // console.log('local', localObj);
    // console.log('fire', fireObj);

    if( !equal ) {
      dispatch({type:'SYNC_REDUX_FIREBASE_CALENDARS', stored:fireObj});
    }
  }
}

// when a mood is clicked
export const updateFirestore = () => {

  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const id = getState().firebase.auth.uid;

    firestore.collection('userCalendars').doc(id).set({
      stored: getState().calendar,
      displayName: getState().firebase.auth.displayName,
      email: getState().firebase.auth.email,
      lastUpdateAt: new Date()
    }).then(()=>{
      // console.log('Firestore was updated');
    }).catch( err =>{
      console.log('Not able to update Firestore');
      console.log(err);
    })
  }
}

export const logIn = () => {
  return(dispatch, getState, {getFirebase})=>{
    const firebase = getFirebase();
    firebase.login({
      provider: 'google',
      type: 'popup'
    }).then((e)=>{
      console.log('Logged in...');
    }).catch(()=>{
      console.log('Log in failed');
    })
  }
}

export const logOut = () =>{
  return(dispatch, getState, {getFirebase})=>{
    const firebase = getFirebase();
    firebase.auth().signOut().then(()=>{
      console.log('Signed Out...');
    })
  }
}
