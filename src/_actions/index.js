
// ACTIONS
export const setClicked = (day, mood) => {
  return(dispatch, getState)=> {
    dispatch({ type: 'SET_CLICKED', day: day, mood: mood });
  }
}

export const setCalendar = (month, year) => {
  return(dispatch, getState)=> {
    dispatch({type: 'SET_CALENDER', month: month, year: year});
  }
}

export const addMoodDay = (day, mood) => {
  return {
    type: 'ADD_MOOD_DAY',
    day: day,
    mood: mood
  }
}

export const addMonth = (name, month) => {
  return(dispatch, getState)=> {
    dispatch({type: 'ADD_MONTH', name:name,month:month});
  }
}

export const syncReduxFirestore = () => {
  return (dispatch, getState) => {
    const user = getState().firebase.auth.uid;
    const stored = getState().firestore.data.userCalendars[user].stored;
    console.log('inside of syncReduxFirestore');
    console.log(stored);

    // dispatch({type:'SYNC_CALENDARS'});
  }
}

export const updateFirestore = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('userCalendars').doc(getState().firebase.auth.uid).set({
      stored: getState().calendar.calendar,
      displayName: getState().firebase.auth.displayName,
      email: getState().firebase.auth.email,
      lastUpdateAt: new Date()
    }).then(()=>{
      console.log('Firestore was updated');
    }).catch((err)=>{
      console.log('Not able to update Firestore')
      console.log(err)
    })
  }
}

export const logIn = () => {
  return(dispatch, getState, {getFirebase})=>{
    const firebase = getFirebase();
    firebase.login({
      provider: 'google',
      type: 'popup'
      // scopes: ['email'] // not required
    }).then((e)=>{
      console.log('logged in`');
      console.log(e);
    }).catch(()=>{
      console.log('log in failed');
    })
  }
}

export const logOut = () =>{
  return(dispatch, getState, {getFirebase})=>{
    const firebase = getFirebase();
    firebase.auth().signOut().then(()=>{
      console.log('signed out');
    })
  }
}
