// REDUCER
const initial = {
  clicked: {
    year: 2020,
    month: null,
    day: null,
    mood: null
  },
  calendar: {
    year2020:{
      // month0:{ num:0, name:'January', length:31, starts:3, days:[{day:1, mood:1}, {day:2, mood:2}, {day:3, mood:3}, {day:4, mood:4}] }
      // , month2:{ num:2, name:'March', length:31, starts:0, days:[{day:1, mood:1}] }
    }
  }
}

const calendarReducer = ( state = initial, action) => {
  switch(action.type) {
    case 'SYNC_REDUX_FIREBASE_CALENDARS':
      console.log('SYNC_REDUX_FIREBASE_CALENDARS reducer');
      // console.log(action.stored);
      return {
        ...state, //copy state
        calendar: { // go into calendar
          ...state.calendar, //copy calendar
          [`year${state.clicked.year}`] : action.stored
        }
      }
    case 'SET_CLICKED':
      return {
        ...state,
         clicked: {
           ...state.clicked,
           day:action.day,
           mood:action.mood
         }
         };
    case 'SET_CALENDER':
      return {
        ...state,
         clicked: {
           ...state.clicked,
           month:action.month,
           year:action.year
         }
         };
    case 'ADD_MONTH':
      return {
        ...state, //copy state
        calendar: { // go into calendar
          ...state.calendar, //copy calendar
          [`year${state.clicked.year}`]:{ // go into year
            ...state.calendar[`year${state.clicked.year}`], // copy year
            [action.name]:action.month
          }
        }
      }
    case 'ADD_MOOD_DAY':
      return {
        ...state,
        calendar: {
          ...state.calendar,
          [`year${state.clicked.year}`]:{
            ...state.calendar[`year${state.clicked.year}`],
            [`month${state.clicked.month}`] : {
              ...state.calendar[`year${state.clicked.year}`][`month${state.clicked.month}`],
                days:
                  [
                    ...state.calendar[`year${state.clicked.year}`][`month${state.clicked.month}`].days,
                    {day: action.day, mood: action.mood}
                  ]
            }
          }
        }
      }
    default:
      return state;
  }
}

export default calendarReducer;
