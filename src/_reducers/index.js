// REDUCER
const initial = {
  clicked: {
    day: 1,
    mood: 1
  },
  calendar: {
    year2020:{
      name:2020,
      // MOOD 1 _ BAD
      // MOOD 2 _ NOT SO GOOD
      // MOOD 3 _ OKAY
      // MOOD 4 _ GOOD
      month2:{
          name:'March',
          length:31,
          starts:0,
          days:[]
      } ,
      month3:{
          name:'April',
          length:30,
          starts:3,
          days:[
            {day:1, mood:2},
            {day:2, mood:1},
            {day:3, mood:4}
          ]
      }
    }
  },
  profile: {
    name: 'Michael',
    dark: false
  }
}

const reducer = ( state = initial, action) => {
  switch(action.type) {
    case 'SET_CLICKED':
      return {
        ...state,
         clicked: {...state.clicked, day:action.day, mood:action.mood}
         };
    case 'ADD_MOOD_DAY':
      return {
        ...state, //copy state
        calendar: {
          ...state.calendar, //copy months
          year2020:{
            ...state.calendar.year2020,
            month2: {
              ...state.calendar.year2020.month2, //copy single month
              days:[...state.calendar.year2020.month2.days, {day: action.day, mood: action.mood}]
            }
          }
        }
      }
    default:
      return state;
  }
}

export default reducer;
