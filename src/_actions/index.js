

// LOCAL ACTIONS

export const setClicked = (day, mood) => {
  return { type: 'SET_CLICKED', day: day, mood: mood };
}

export const setCalendar = (month, year) => {
  return { type: 'SET_CALENDER', month: month, year: year } ;
}




export const addMonth = (name, month) => {
  return { type: 'ADD_MONTH', name:name, month:month } ;
}

export const addMoodDay = (day, mood, message) => {
  return { type: 'ADD_MOOD_DAY', day: day, mood: mood, message:message}
}

export const addMessage = (day, message) => {
  return { type: 'ADD_MESSAGE', day:day, message:message }
}




// FIREBASE ACTIONS

// when app first starts.
export const syncReduxFirestore = (firestoreCalendars) => {
  return (dispatch, getState) => {
    const localMonths = Object.keys(getState().calendar.calendar.year2020);

    if( localMonths.length >= 1 ){
      const user = getState().firebase.auth.uid;
      const month = getState().calendar.clicked.month;
      const localDaysArray = getState().calendar.calendar.year2020[`month${month}`].days;
      const storedDaysArray = getState().firestore.data.userCalendars[user]? getState().firestore.data.userCalendars[user].stored.year2020[`month${month}`].days : 0;

      if( JSON.stringify(storedDaysArray)!==JSON.stringify(localDaysArray) ) {
        const x = getState().firestore.data.userCalendars[user].stored.year2020;
        dispatch({type:'SYNC_REDUX_FIREBASE_CALENDARS', stored:x});
      }
    }
  }
}

// when a mood is clicked
export const updateFirestore = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const id = getState().firebase.auth.uid;

    firestore.collection('userCalendars').doc(id).set({
      stored: getState().calendar.calendar,
      displayName: getState().firebase.auth.displayName,
      email: getState().firebase.auth.email,
      lastUpdateAt: new Date()
    }).then(()=>{
      console.log('Firestore was updated');
    }).catch((err)=>{
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
