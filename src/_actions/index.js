

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



export const setMood = (mood) => {
  return (dispatch, getState) => {
    const currentMonth = getState().current.month;
    const currentDay = getState().current.day;
    dispatch({ type: 'SET_MOOD', month:currentMonth, day:currentDay, mood:mood });
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
  return (dispatch, getState) => {
    console.log('sync redux firestore');
    console.log(getState());

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
