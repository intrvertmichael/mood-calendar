
// ACTIONS
export const setClicked = (day, mood) => {
  return {
    type: 'SET_CLICKED',
    day: day,
    mood: mood
  }
}

export const setCalendar = (month, year) => {
  return {
    type: 'SET_CALENDER',
    month: month,
    year: year
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
  return {
    type: 'ADD_MONTH',
    name:name,
    month:month
  }
}

export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('projects').add({
      ...project,
      authorFirst: 'Net',
      authorLast: 'Ninja',
      createdAt: new Date()
    }).then(()=>{
      console.log('firestore:');
      console.log(firestore);
      dispatch({type: 'CREATE_PROJECT', project})
    }).catch((err)=>{
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
